import type { ArrondissementsSection } from "@/lib/strapi-types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ArrondissementsAdapterProps {
  data: ArrondissementsSection;
}

/**
 * Adaptateur pour le Arrondissements Section - Version dynamique
 */
export default function ArrondissementsAdapter({ data }: ArrondissementsAdapterProps) {
  // Génération automatique des 20 arrondissements si showAllArrondissements est true
  const arrondissements = data.showAllArrondissements 
    ? Array.from({ length: 20 }, (_, i) => ({
        numero: i + 1,
        nom: `${i + 1}${i === 0 ? 'er' : 'ème'}`,
      }))
    : [];

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
        {data.layout === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {arrondissements.map((arr) => (
              <Link
                key={arr.numero}
                href={`/plombier/paris-${arr.numero}`}
                className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 group-hover:text-blue-600">
                    Paris {arr.nom}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Layout liste */}
        {data.layout === 'list' && (
          <div className="max-w-3xl mx-auto space-y-2">
            {arrondissements.map((arr) => (
              <Link
                key={arr.numero}
                href={`/plombier/paris-${arr.numero}`}
                className="group flex items-center justify-between p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 rounded-lg transition-all"
              >
                <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                  Plombier Paris {arr.nom}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
