import type { ArrondissementsSection } from "@/lib/strapi-types";
import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

interface ArrondissementsAdapterProps {
  data: ArrondissementsSection;
}

interface StrapiArrondissement {
  id: number;
  numero: number;
  nom: string;
  slug: string;
  titre_h1?: string;
}

/**
 * Adaptateur pour le Arrondissements Section - Version dynamique avec données Strapi
 */
export default async function ArrondissementsAdapter({ data }: ArrondissementsAdapterProps) {
  // Récupération des arrondissements depuis Strapi
  let arrondissements: StrapiArrondissement[] = [];
  
  try {
    const response = await fetchContentType("arrondissements", {
      sort: ["numero:asc"],
      pagination: {
        page: 1,
        pageSize: 100, // Récupérer tous les arrondissements disponibles
      },
    });
    arrondissements = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des arrondissements:", error);
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          {data.title}
        </h2>
        
        {data.subtitle && (
          <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-12">
            {data.subtitle}
          </p>
        )}

        {/* Grid d'arrondissements */}
        {data.layout === 'grid' && arrondissements.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {arrondissements.map((arr) => (
              <Link
                key={arr.id}
                href={`/plombier/${arr.slug}`}
                className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 group-hover:text-blue-600 text-sm">
                      {arr.nom}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  {arr.numero && (
                    <span className="text-xs text-gray-500">({arr.numero})</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Layout liste */}
        {data.layout === 'list' && arrondissements.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-2">
            {arrondissements.map((arr) => (
              <Link
                key={arr.id}
                href={`/plombier/${arr.slug}`}
                className="group flex items-center justify-between p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 rounded-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {arr.nom}
                    </span>
                    {arr.numero && (
                      <span className="text-xs text-gray-500">Code: {arr.numero}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        )}

        {/* Message si aucun arrondissement */}
        {arrondissements.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune zone d'intervention configurée pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
