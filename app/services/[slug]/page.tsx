import { fetchContentType } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHeroSection from "@/components/services/unique/ServiceHeroSection";
import ServiceAdvantagesSection from "@/components/services/unique/ServiceAdvantagesSection";
import ServiceContentSections from "@/components/services/unique/ServiceContentSections";
import ServiceProcessSection from "@/components/services/unique/ServiceProcessSection";
import ServiceTestimonialsSection from "@/components/services/unique/ServiceTestimonialsSection";
import ServiceFAQSection from "@/components/services/unique/ServiceFAQSection";
import ServiceCTASection from "@/components/services/unique/ServiceCTASection";
import ServiceRelatedServicesSection from "@/components/services/unique/ServiceRelatedServicesSection";
import ServiceStickyCTA from "@/components/services/unique/ServiceStickyCTA";

export default async function ServicePage({ params }: { params: { slug: string } }) {
  let service = null;
  let relatedServices = [];
  
  try {
    const response = await fetchContentType("services", {
      filters: { slug: { $eq: params.slug } },
      populate: {
        coverImage: {
          fields: ["url", "alternativeText", "width", "height", "formats"],
        },
        contentSections: {
          populate: {
            images: {
              fields: ["url", "alternativeText", "width", "height", "formats"],
            },
          },
        },
      },
    });
    
    service = response.data?.[0];
    if (!service) notFound();

    // Services connexes
    try {
      const relatedResponse = await fetchContentType("services", {
        filters: {
          category: { $eq: service.category },
          slug: { $ne: params.slug },
        },
        populate: "*",
        pagination: { limit: 3 },
      });
      relatedServices = relatedResponse.data || [];
    } catch (e) {
      console.error("Erreur services connexes:", e);
    }
  } catch (error) {
    console.error("Erreur chargement service:", error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ServiceHeroSection service={service} />

      {/* Contenu Principal */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <ServiceAdvantagesSection avantages={service.avantages} />
          <ServiceContentSections contentSections={service.contentSections} serviceName={service.nom} />
          <ServiceProcessSection processus={service.processus} />
          <ServiceTestimonialsSection testimonials={service.testimonials} />
          <ServiceFAQSection faq={service.faq} />

          <ServiceCTASection />

          <ServiceRelatedServicesSection relatedServices={relatedServices} />
        </div>
      </main>

      <ServiceStickyCTA />

      <div className="lg:hidden h-24" />

      <Footer />
    </div>
  );
}
