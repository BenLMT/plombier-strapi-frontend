import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Euro, ArrowRight, CheckCircle, Clock } from "lucide-react";
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
 * Showcase Version 1 - Layout Horizontal avec image à gauche
 * Design moderne avec cartes allongées et image sur le côté
 */
export default async function ServicesShowcaseAdapter1({ data }: ServicesShowcaseAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête de section */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="text-primary text-sm font-bold uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full">
              Nos Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Liste des services en horizontal */}
        {services.length > 0 ? (
          <div className="space-y-6">
            {services.map((service, index) => {
              const imageUrl = service.coverImage?.url;
              const isEven = index % 2 === 0;
              
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group block"
                >
                  <article className={`bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary ${isEven ? '' : 'ml-auto max-w-6xl'}`}>
                    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                      {/* Image */}
                      <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                        {imageUrl ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={`${baseURL}${imageUrl}`}
                              alt={service.coverImage?.alternativeText || service.nom}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 40vw"
                              quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                          </div>
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
                            <span className="text-primary text-6xl font-bold opacity-30">
                              {service.nom.charAt(0)}
                            </span>
                          </div>
                        )}
                        
                        {/* Badge Populaire */}
                        {service.populaire && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center bg-accent text-primary text-xs font-bold px-4 py-2 rounded-full shadow-xl backdrop-blur-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Service Populaire
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Contenu */}
                      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-1 bg-primary rounded-full" />
                          <span className="text-primary text-sm font-semibold">Service #{index + 1}</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                          {service.nom}
                        </h3>
                        
                        {service.description_courte && (
                          <p className="text-gray-600 text-base mb-6 leading-relaxed">
                            {service.description_courte}
                          </p>
                        )}
                        
                        {/* Footer avec prix et CTA */}
                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                          <div className="flex items-center bg-accent/20 rounded-xl py-3 px-5 border border-accent/30">
                            <Euro className="w-5 h-5 mr-2 text-primary" />
                            <span className="font-bold text-gray-900 text-lg">
                              {service.prix_min}€ - {service.prix_max}€
                            </span>
                          </div>
                          
                          <div className="inline-flex items-center space-x-2 text-primary font-bold group-hover:gap-4 transition-all">
                            <span>Découvrir</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
          <div className="text-center py-16 bg-gray-50 rounded-3xl">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun service disponible pour le moment.</p>
          </div>
        )}
        
        {/* CTA vers tous les services */}
        {services.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-primary-700 hover:from-primary-700 hover:to-primary text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="text-lg">Explorer tous nos services</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
