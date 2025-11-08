"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ArrondissementsSection() {
  const arrondissements = [
    { numero: 1, nom: "1er" },
    { numero: 2, nom: "2ème" },
    { numero: 3, nom: "3ème" },
    { numero: 4, nom: "4ème" },
    { numero: 5, nom: "5ème" },
    { numero: 6, nom: "6ème" },
    { numero: 7, nom: "7ème" },
    { numero: 8, nom: "8ème" },
    { numero: 9, nom: "9ème" },
    { numero: 10, nom: "10ème" },
    { numero: 11, nom: "11ème" },
    { numero: 12, nom: "12ème" },
    { numero: 13, nom: "13ème" },
    { numero: 14, nom: "14ème" },
    { numero: 15, nom: "15ème" },
    { numero: 16, nom: "16ème" },
    { numero: 17, nom: "17ème" },
    { numero: 18, nom: "18ème" },
    { numero: 19, nom: "19ème" },
    { numero: 20, nom: "20ème" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          Un plombier disponible dans tout Paris
        </h2>
        
        <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-12">
          Trouver un plombier à Paris en urgence vous semble compliqué ? Plus maintenant. Nos artisans couvrent <strong className="text-gray-900">l'ensemble de la capitale</strong> et se déplacent dans <strong className="text-gray-900">tous les arrondissements</strong>, même au 7ᵉ étage sans ascenseur !
        </p>

        {/* Grid d'arrondissements */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {arrondissements.map((arr) => (
            <Link
              key={arr.numero}
              href={`/plombier/paris-${arr.numero}`}
              className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 group-hover:text-blue-600">
                  Plombier Paris {arr.nom}
                </span>
                <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
