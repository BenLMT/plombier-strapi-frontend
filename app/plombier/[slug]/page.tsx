import { notFound } from "next/navigation";
import Header from "@/components/Header";
import HeroSection from "@/components/plombier/HeroSection";
import ProcessSection from "@/components/plombier/ProcessSection";
import ServicesShowcaseSection from "@/components/plombier/ServicesShowcaseSection";
import TestimonialsModernSection from "@/components/plombier/TestimonialsModernSection";
import CTAUrgenceBox from "@/components/plombier/CTAUrgenceBox";
import ArrondissementsSection from "@/components/plombier/ArrondissementsSection";
import FAQSection from "@/components/plombier/FAQSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/plombier/FloatingCTA";
import StructuredData from "@/components/StructuredData";

// Générer les 20 arrondissements de Paris
export async function generateStaticParams() {
  const arrondissements = Array.from({ length: 20 }, (_, i) => ({
    slug: `paris-${i + 1}`,
  }));

  return arrondissements;
}

// Fonction pour récupérer les données de l'arrondissement depuis Strapi
async function getArrondissementData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/arrondissements?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600 } } // Cache 1 heure
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return null;
  }
}

// Metadata SEO dynamique
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const arrondissement = await getArrondissementData(params.slug);

  if (!arrondissement) {
    return {
      title: "Page non trouvée",
    };
  }

  const { meta_title, meta_description } = arrondissement.attributes;

  return {
    title: meta_title,
    description: meta_description,
    openGraph: {
      title: meta_title,
      description: meta_description,
      type: "website",
    },
  };
}

export default async function ArrondissementPage({ params }: { params: { slug: string } }) {
  const arrondissement = await getArrondissementData(params.slug);

  // Si l'arrondissement n'existe pas dans Strapi, afficher la page par défaut
  // (en attendant que tous les arrondissements soient créés)
  const displayData = arrondissement?.attributes || {
    numero: parseInt(params.slug.replace('paris-', '')),
    nom: `${params.slug.replace('paris-', '')}${params.slug === 'paris-1' ? 'er' : 'ème'} arrondissement`,
    titre_h1: `Plombier Paris ${params.slug.replace('paris-', '')} - Intervention Rapide`,
    hero_titre: `Un plombier fiable chez vous à Paris ${params.slug.replace('paris-', '')}, sans attendre !`,
    hero_sous_titre: "Une exigence reconnue, une confiance qui dure",
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section personnalisée */}
        <HeroSection />
        
        <ProcessSection />
        <ServicesShowcaseSection />
        <TestimonialsModernSection />
        <CTAUrgenceBox />
        
        {/* Section de contenu SEO spécifique à l'arrondissement */}
        {arrondissement?.attributes?.contenu_seo && (
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: arrondissement.attributes.contenu_seo }}
              />
            </div>
          </section>
        )}
        
        <ArrondissementsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCTA />
      <StructuredData />
    </>
  );
}
