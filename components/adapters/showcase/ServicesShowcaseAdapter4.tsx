import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Euro, ArrowRight, CheckCircle, Zap } from "lucide-react";
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
 * Showcase Version 4 - Cartes avec hover flip 3D effect
 * Design interactif avec effet de retournement 3D au survol
 */
export default async function ServicesShowcaseAdapter4({ data }: ServicesShowcaseAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  let services: StrapiService[] = [];
  try {
    const response = await fetchContentType("services", {
      populate: "coverImage",
      sort: ["ordre:asc", "nom:asc"],
      pagination: { page: 1, pageSize: 6 },
    });
    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 bg-accent/20 px-6 py-3 rounded-full border border-accent/40">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-bold uppercase tracking-wider">Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          
          {data.subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const imageUrl = service.coverImage?.url;
              
              return (
                <Link key={service.id} href={`/services/${service.slug}`} className="group block">
                  <article className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 hover:scale-[1.02]">
                    {/* Image de fond */}
                    {imageUrl ? (
                      <Image
                        src={`${baseURL}${imageUrl}`}
                        alt={service.coverImage?.alternativeText || service.nom}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500" />
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                    
                    {/* Badge Populaire */}
                    {service.populaire && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center bg-accent/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-2 rounded-full shadow-xl">
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          Top
                        </span>
                      </div>
                    )}
                    
                    {/* Contenu */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Numéro du service en haut */}
                      <div className="flex justify-start">
                        <span className="text-accent text-xs font-bold bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                          Service
                        </span>
                      </div>
                      
                      {/* Titre et infos en bas */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white line-clamp-2">
                          {service.nom}
                        </h3>
                        
                        {service.description_courte && (
                          <p className="text-white/80 text-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {service.description_courte}
                          </p>
                        )}
                        
                        {/* Prix et CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/20">
                          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg py-2 px-4">
                            <Euro className="w-4 h-4 mr-1.5 text-accent" />
                            <span className="font-bold text-white text-sm">
                              {service.prix_min}€ - {service.prix_max}€
                            </span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
                            <ArrowRight className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-gray-400 text-lg">Aucun service disponible.</p>
          </div>
        )}
        
        {services.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center space-x-3 bg-accent hover:bg-accent/90 text-gray-900 font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              <span className="text-lg">Voir tous nos services</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
