import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Euro, ArrowRight, AlertCircle } from "lucide-react";

interface ServiceAdapterProps {
  service: {
    id: number;
    nom: string;
    slug: string;
    description_courte?: string;
    prix_min: number;
    prix_max: number;
    populaire?: boolean;
    urgence?: boolean;
    category?: string;
    coverImage?: {
      url: string;
      alternativeText?: string;
    };
    image?: {
      url: string;
      alternativeText?: string;
    };
  };
  variant?: "card" | "list" | "featured";
}

/**
 * Adapter pour afficher un service
 * Réutilise les couleurs des autres adapters (primary, secondary, accent)
 */
export default function ServiceAdapter({ service, variant = "card" }: ServiceAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const imageUrl = service.coverImage?.url || service.image?.url;

  // Variant "featured" - Grande carte mise en avant
  if (variant === "featured") {
    return (
      <Link href={`/service/${service.slug}`} className="group block">
        <article className="bg-gradient-to-br from-primary to-primary-800 text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            {imageUrl && (
              <div className="relative h-64 md:h-full overflow-hidden">
                <Image
                  src={`${baseURL}${imageUrl}`}
                  alt={service.nom}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent"></div>
              </div>
            )}
            
            {/* Contenu */}
            <div className="p-8 flex flex-col justify-center">
              {service.urgence && (
                <div className="inline-flex items-center space-x-2 bg-red-500 rounded-full px-4 py-2 text-sm font-bold mb-4 w-fit">
                  <AlertCircle className="w-4 h-4" />
                  <span>Service d'urgence</span>
                </div>
              )}
              
              {service.category && (
                <span className="text-accent text-sm font-semibold uppercase mb-2">
                  {service.category}
                </span>
              )}
              
              <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                {service.nom}
              </h3>
              
              {service.description_courte && (
                <p className="text-white/90 mb-6 leading-relaxed">
                  {service.description_courte}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-accent rounded-lg px-4 py-2">
                  <Euro className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary text-lg">
                    {service.prix_min}€ - {service.prix_max}€
                  </span>
                </div>
                
                <div className="inline-flex items-center space-x-2 text-accent group-hover:translate-x-2 transition-transform">
                  <span className="font-semibold">En savoir plus</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Variant "list" - Vue en liste compacte
  if (variant === "list") {
    return (
      <Link href={`/service/${service.slug}`} className="group block">
        <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary">
          <div className="flex items-start gap-6">
            {/* Image */}
            {imageUrl && (
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                <Image
                  src={`${baseURL}${imageUrl}`}
                  alt={service.nom}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            
            {/* Contenu */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {service.category && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-secondary bg-secondary-50 rounded-full mb-2">
                      {service.category}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition">
                    {service.nom}
                  </h3>
                </div>
                
                {/* Badges */}
                <div className="flex gap-2">
                  {service.urgence && (
                    <span className="inline-flex items-center bg-red-50 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Urgence
                    </span>
                  )}
                  {service.populaire && (
                    <span className="inline-flex items-center bg-accent text-primary text-xs font-semibold px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Populaire
                    </span>
                  )}
                </div>
              </div>
              
              {service.description_courte && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {service.description_courte}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-accent font-bold">
                  <Euro className="w-4 h-4 mr-1" />
                  {service.prix_min}€ - {service.prix_max}€
                </div>
                
                <div className="inline-flex items-center space-x-1 text-primary group-hover:translate-x-2 transition-transform text-sm font-semibold">
                  <span>Voir le service</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Variant "card" (default) - Carte classique
  return (
    <Link href={`/service/${service.slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary h-full flex flex-col">
        {/* Image */}
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
            <Image
              src={`${baseURL}${imageUrl}`}
              alt={service.nom}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges sur l'image */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {service.urgence && (
                <span className="inline-flex items-center bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Urgence
                </span>
              )}
              {service.populaire && (
                <span className="inline-flex items-center bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Populaire
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Contenu */}
        <div className="p-6 flex-1 flex flex-col">
          {service.category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary-50 rounded-full mb-3 w-fit">
              {service.category.toUpperCase()}
            </span>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition mb-3 line-clamp-2 flex-grow">
            {service.nom}
          </h3>
          
          {service.description_courte && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
              {service.description_courte}
            </p>
          )}
          
          {/* Footer avec prix et CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center text-accent font-bold">
              <Euro className="w-4 h-4 mr-1" />
              <span>{service.prix_min}€ - {service.prix_max}€</span>
            </div>
            
            <div className="inline-flex items-center space-x-1 text-primary group-hover:translate-x-2 transition-transform text-sm font-semibold">
              <span>En savoir plus</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
