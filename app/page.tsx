import { fetchContentType } from "@/lib/strapi";
import type { StrapiResponse, HomePage } from "@/lib/strapi-types";
import { getHomePagePopulate } from "@/lib/strapi-populate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/plombier/FloatingCTA";
import StructuredData from "@/components/StructuredData";
import DynamicZone from "@/components/adapters/DynamicZone";

// Pas de cache pour cette page
export const dynamic = 'force-dynamic';

/**
 * Page d'accueil dynamique utilisant Strapi
 * Cette page récupère son contenu depuis Strapi et utilise la Dynamic Zone
 */
export default async function HomeDynamic() {
  let homePageData: HomePage | null = null;
  let error: string | null = null;

  try {
    // Récupérer les données de la homepage depuis Strapi
    // Le populate est centralisé dans lib/strapi-populate.ts
    const response: StrapiResponse<HomePage> = await fetchContentType("home-page", getHomePagePopulate());
    
    homePageData = response.data;
  } catch (e) {
    console.error("Erreur lors de la récupération de la homepage:", e);
    error = e instanceof Error ? e.message : "Erreur inconnue";
  }

  // Si erreur ou pas de données, afficher un message
  if (error || !homePageData) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Configuration requise
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "Aucune donnée de homepage disponible dans Strapi."}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              📋 Pour configurer la homepage dynamique :
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Démarrez Strapi : <code className="bg-gray-100 px-2 py-1 rounded">cd strapi && npm run develop</code></li>
              <li>Connectez-vous à l'admin Strapi (http://localhost:1337/admin)</li>
              <li>Allez dans "Content Manager" → "Single Types" → "Home Page"</li>
              <li>Ajoutez des blocs dans la Dynamic Zone "blocks"</li>
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
        <DynamicZone blocks={homePageData.blocks} />
      </main>
      <Footer />
      <FloatingCTA />
      <StructuredData />
    </>
  );
}
