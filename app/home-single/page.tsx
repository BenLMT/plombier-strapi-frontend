import { fetchContentType } from "@/lib/strapi";
import type { StrapiResponse, HomeSingle } from "@/lib/strapi-types";
import { getHomeSinglePopulate } from "@/lib/strapi-populate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/plombier/FloatingCTA";
import StructuredData from "@/components/StructuredData";
import HeroAdapter from "@/components/adapters/hero/HeroAdapter";
import HeroWithFormAdapter from "@/components/adapters/hero/HeroWithFormAdapter";
import ProcessAdapter from "@/components/adapters/process/ProcessAdapter";
import ServicesShowcaseAdapter from "@/components/adapters/showcase/ServicesShowcaseAdapter";
import TestimonialsAdapter from "@/components/adapters/TestimonialsAdapter";
import CTAUrgenceAdapter from "@/components/adapters/CTA-urgence/CTAUrgenceAdapter";
import ArrondissementsAdapter from "@/components/adapters/ArrondissementsAdapter";
import FAQAdapter from "@/components/adapters/FAQAdapter";
import SeoContentAdapter from "@/components/adapters/SeoContentAdapter";
import MyTestAdapter from "@/components/adapters/MyTestAdapter";

export const dynamic = "force-dynamic";

export default async function HomeSinglePage() {
  let homeSingleData: HomeSingle | null = null;
  let error: string | null = null;

  try {
    const response: StrapiResponse<HomeSingle> = await fetchContentType(
      "home-single",
      getHomeSinglePopulate()
    );

    homeSingleData = response.data;
  } catch (e) {
    console.error("Erreur lors de la récupération de home-single:", e);
    error = e instanceof Error ? e.message : "Erreur inconnue";
  }

  if (error || !homeSingleData) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Configuration requise</h1>
          <p className="text-gray-600 mb-8">
            {error || "Aucune donnée home-single disponible dans Strapi."}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              📋 Pour configurer la page home-single :
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Démarrez Strapi : <code className="bg-gray-100 px-2 py-1 rounded">cd strapi && npm run develop</code></li>
              <li>Connectez-vous à l'admin Strapi (http://localhost:1337/admin)</li>
              <li>Allez dans "Content Manager" → "Single Types" → "Home Single"</li>
              <li>Renseignez les composants (Hero, Process, Services, etc.)</li>
              <li>Publiez la page</li>
              <li>Rechargez cette page</li>
            </ol>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {homeSingleData.hero && <HeroAdapter data={homeSingleData.hero} />}
        {homeSingleData.heroWithForm && (
          <HeroWithFormAdapter data={homeSingleData.heroWithForm} />
        )}
        {homeSingleData.process && <ProcessAdapter data={homeSingleData.process} />}
        {homeSingleData.servicesShowcase && (
          <ServicesShowcaseAdapter data={homeSingleData.servicesShowcase} />
        )}
        {homeSingleData.testimonials && (
          <TestimonialsAdapter data={homeSingleData.testimonials} />
        )}
        {homeSingleData.ctaUrgence && (
          <CTAUrgenceAdapter data={homeSingleData.ctaUrgence} />
        )}
        {homeSingleData.arrondissements && (
          <ArrondissementsAdapter data={homeSingleData.arrondissements} />
        )}
        {homeSingleData.faq && <FAQAdapter data={homeSingleData.faq} />}
        {homeSingleData.seoContent && (
          <SeoContentAdapter data={homeSingleData.seoContent} />
        )}
        {homeSingleData.myTest && <MyTestAdapter data={homeSingleData.myTest} />}
      </main>
      <Footer />
      <FloatingCTA />
      <StructuredData />
    </>
  );
}
