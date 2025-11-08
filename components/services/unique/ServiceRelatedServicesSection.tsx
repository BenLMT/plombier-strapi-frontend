import Link from "next/link";
import Image from "next/image";
import { Euro } from "lucide-react";

interface ServiceRelatedServicesSectionProps {
  relatedServices: any[];
}

const ServiceRelatedServicesSection = ({ relatedServices }: ServiceRelatedServicesSectionProps) => {
  if (!Array.isArray(relatedServices) || relatedServices.length === 0) return null;

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Découvrez aussi
        </h2>
        <p className="text-lg text-gray-600">
          Nos autres services qui pourraient vous intéresser
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedServices.map((related: any) => (
          <Link key={related.id} href={`/services/${related.slug}`} className="group">
            <article className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all h-full">
              {related.coverImage?.url && (
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${related.coverImage.url}`}
                    alt={related.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition mb-3">
                  {related.nom}
                </h3>
                {related.description_courte && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {related.description_courte}
                  </p>
                )}
                <div className="flex items-center text-accent font-bold">
                  <Euro className="w-4 h-4 mr-1" />
                  {related.prix_min}€ - {related.prix_max}€
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceRelatedServicesSection;
