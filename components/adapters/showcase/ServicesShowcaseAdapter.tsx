import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Euro, ArrowRight, CheckCircle } from "lucide-react";
import type { ServicesShowcaseSection } from "@/lib/strapi-types";

interface ServicesShowcaseAdapterProps {
  data: ServicesShowcaseSection;
}

interface StrapiService {
  id: number;
  nom: string;
  slug: string;
  description_courte?: string;
  prix_min: number;
  prix_max: number;
  populaire?: boolean;
  coverImage?: {
    url: string;
    alternativeText?: string;
  };
}

/**
 * Adaptateur pour le Services Showcase Section - Version dynamique
 * Récupère les 5 premiers services depuis l'API Strapi pour créer du maillage interne
 */
export default async function ServicesShowcaseAdapter({ data }: ServicesShowcaseAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Récupération des 5 premiers services depuis Strapi
  let services: StrapiService[] = [];
  try {
    const response = await fetchContentType("services", {
      populate: "coverImage",
      sort: ["ordre:asc", "nom:asc"],
      pagination: {
        page: 1,
        pageSize: 5,
      },
    });
    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {data.title}
          </h2>
          
          {data.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Affichage des services */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => {
              const imageUrl = service.coverImage?.url;
              
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary h-full flex flex-col transform hover:-translate-y-2">
                    {/* Image de couverture */}
                    {imageUrl ? (
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                        <Image
                          src={`${baseURL}${imageUrl}`}
                          alt={service.coverImage?.alternativeText || service.nom}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                          quality={85}
                        />
                        
                        {/* Badge Populaire */}
                        {service.populaire && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Populaire
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative h-48 w-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <span className="text-primary text-4xl font-bold opacity-20">
                          {service.nom.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Contenu */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition mb-3 line-clamp-2 flex-grow">
                        {service.nom}
                      </h3>
                      
                      {service.description_courte && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {service.description_courte}
                        </p>
                      )}
                      
                      {/* Footer avec prix */}
                      <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center bg-accent/10 rounded-lg py-2 px-3">
                          <Euro className="w-4 h-4 mr-1 text-gray-700" />
                          <span className="font-bold text-gray-900 text-sm">
                            {service.prix_min}€ - {service.prix_max}€
                          </span>
                        </div>
                        
                        <div className="inline-flex items-center justify-center space-x-1 text-primary group-hover:translate-x-1 transition-transform text-sm font-semibold">
                          <span>Voir le service</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun service disponible pour le moment.</p>
          </div>
        )}
        
        {/* Lien vers tous les services */}
        {services.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Voir tous nos services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}