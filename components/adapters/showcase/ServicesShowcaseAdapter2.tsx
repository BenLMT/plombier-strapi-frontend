import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Euro, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
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
 * Showcase Version 2 - Cartes avec effet Glassmorphism et gradient overlay
 * Design moderne avec effets de transparence et superposition
 */
export default async function ServicesShowcaseAdapter2({ data }: ServicesShowcaseAdapterProps) {
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

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Background subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.03),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* En-tête avec effet glassmorphism */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/60 shadow-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              Services Premium
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-700 to-secondary">
              {data.title}
            </span>
          </h2>
          
          {data.subtitle && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Grille de services avec glassmorphism */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const imageUrl = service.coverImage?.url;
              
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <article className="relative h-full min-h-[420px] rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
                    {/* Image de fond */}
                    <div className="absolute inset-0">
                      {imageUrl ? (
                        <Image
                          src={`${baseURL}${imageUrl}`}
                          alt={service.coverImage?.alternativeText || service.nom}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={90}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-300 to-secondary-300" />
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                    </div>
                    
                    {/* Badge Populaire */}
                    {service.populaire && (
                      <div className="absolute top-5 right-5 z-10">
                        <span className="inline-flex items-center bg-accent/90 backdrop-blur-md text-primary text-xs font-bold px-4 py-2 rounded-full shadow-xl border border-white/30">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Top Service
                        </span>
                      </div>
                    )}
                    
                    {/* Contenu avec glassmorphism */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      {/* Card glassmorphism */}
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                          {service.nom}
                        </h3>
                        
                        {service.description_courte && (
                          <p className="text-white/90 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {service.description_courte}
                          </p>
                        )}
                        
                        {/* Prix avec glassmorphism */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/20">
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4">
                            <Euro className="w-4 h-4 mr-2 text-accent" />
                            <span className="font-bold text-white text-sm">
                              {service.prix_min}€ - {service.prix_max}€
                            </span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent transition-colors shadow-lg">
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
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
          <div className="text-center py-16 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
            <p className="text-gray-600 text-lg">Aucun service disponible pour le moment.</p>
          </div>
        )}
        
        {/* CTA avec effet glassmorphism */}
        {services.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-md hover:bg-white text-primary font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-white/60"
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
