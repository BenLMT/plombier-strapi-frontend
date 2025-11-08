import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Euro, ArrowRight, CheckCircle, Star } from "lucide-react";
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
 * Showcase Version 3 - Style Bento/Masonry avec tailles variables
 * Design moderne avec layout asymétrique et grille créative
 */
export default async function ServicesShowcaseAdapter3({ data }: ServicesShowcaseAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  let services: StrapiService[] = [];
  try {
    const response = await fetchContentType("services", {
      populate: "coverImage",
      sort: ["ordre:asc", "nom:asc"],
      pagination: {
        page: 1,
        pageSize: 6,
      },
    });
    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  // Pattern pour alterner les tailles (grand, petit, petit, moyen, moyen, moyen)
  const getSizeClass = (index: number) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2"; // Grand
      case 1:
      case 2:
        return "md:col-span-1 md:row-span-1"; // Petit
      case 3:
      case 4:
      case 5:
        return "md:col-span-1 md:row-span-2"; // Moyen vertical
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête moderne */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative inline-block mb-6">
            <Star className="w-6 h-6 text-accent absolute -top-3 -right-3 animate-pulse" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-gray-900">{data.title}</span>
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4" />
          </div>
          
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Grille Bento/Masonry */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6">
            {services.map((service, index) => {
              const imageUrl = service.coverImage?.url;
              const isLarge = index % 6 === 0;
              
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className={`group block ${getSizeClass(index)}`}
                >
                  <article className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border-2 border-gray-100 hover:border-primary">
                    {/* Image de fond */}
                    <div className="absolute inset-0">
                      {imageUrl ? (
                        <>
                          <Image
                            src={`${baseURL}${imageUrl}`}
                            alt={service.coverImage?.alternativeText || service.nom}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                            quality={90}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-200 via-accent/50 to-secondary-200">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                    </div>
                    
                    {/* Badge Populaire - Position absolue top */}
                    {service.populaire && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center bg-gradient-to-r from-accent to-accent/90 text-primary text-xs font-bold px-3 py-2 rounded-full shadow-xl">
                          <CheckCircle className="w-3 h-3 mr-1.5" />
                          Populaire
                        </span>
                      </div>
                    )}
                    
                    {/* Contenu superposé */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <div className="space-y-3">
                        {/* Numéro du service */}
                        <div className="inline-block">
                          <span className="text-accent text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            0{index + 1}
                          </span>
                        </div>
                        
                        <h3 className={`font-bold text-white ${isLarge ? 'text-3xl' : 'text-xl'} line-clamp-2 group-hover:text-accent transition-colors`}>
                          {service.nom}
                        </h3>
                        
                        {service.description_courte && isLarge && (
                          <p className="text-white/90 text-sm line-clamp-2">
                            {service.description_courte}
                          </p>
                        )}
                        
                        {/* Prix et CTA */}
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3">
                            <Euro className="w-4 h-4 mr-1.5 text-accent" />
                            <span className="font-bold text-white text-sm">
                              {service.prix_min}€ - {service.prix_max}€
                            </span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-primary group-hover:bg-accent transition-all duration-300 flex items-center justify-center shadow-lg group-hover:scale-110">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Effet de bordure animée au hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-3xl transition-all duration-500 pointer-events-none" />
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">Aucun service disponible pour le moment.</p>
          </div>
        )}
        
        {/* CTA moderne */}
        {services.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="group inline-flex items-center space-x-3 bg-gray-900 hover:bg-primary text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="text-lg">Découvrir tous les services</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
