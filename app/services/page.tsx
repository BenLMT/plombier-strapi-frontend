import { fetchContentType } from "@/lib/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPageHeroSection from "@/components/services/ServicesPageHeroSection";
import ServicesListSection from "@/components/services/ServicesListSection";
import ServicesEmptyState from "@/components/services/ServicesEmptyState";
import ServicesCTASection from "@/components/services/ServicesCTASection";

export default async function ServicesPage() {
  let services = [];

  try {
    const response = await fetchContentType("services", {
      populate: "*",
      sort: ["ordre:asc", "nom:asc"],
    });
    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  const hasServices = Array.isArray(services) && services.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ServicesPageHeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {hasServices ? <ServicesListSection services={services} /> : <ServicesEmptyState />}

        <ServicesCTASection hasServices={hasServices} />
      </main>

      <Footer />
    </div>
  );
}
