import type { ServicesShowcaseSection } from "@/lib/strapi-types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Euro } from "lucide-react";
import Image from "next/image";

interface ServicesShowcaseAdapterProps {
  data: ServicesShowcaseSection;
}

/**
 * Adaptateur pour le Services Showcase Section - Version dynamique
 */
export default function ServicesShowcaseAdapter({ data }: ServicesShowcaseAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          {data.title}
        </h2>
        
        {data.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-8">
            {data.subtitle}
          </p>
        )}
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {/* Image de gauche */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/plombier-salle-de-bain.png"
                alt="Plombier professionnel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>

          {/* Grid de services à droite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.services.map((service) => (
              <Card key={service.id} hover className="flex flex-col">
                {/* Image optimisée */}
                {service.image?.url && (
                  <div className="relative h-32 rounded-lg mb-3 overflow-hidden">
                    <Image
                      src={`${baseURL}${service.image.url}`}
                      alt={service.image.alternativeText || service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={80}
                    />
                  </div>
                )}
                
                {/* Service Title */}
                <h3 className="font-semibold text-primary text-sm mb-2 flex-grow">
                  {service.title}
                </h3>
                
                {/* Price Badge */}
                <Badge variant="success" className="w-fit">
                  <Euro className="w-3 h-3 inline mr-1" />
                  {service.price || "Sur devis"}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
