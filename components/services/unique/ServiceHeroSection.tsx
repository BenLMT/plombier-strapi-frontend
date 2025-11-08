import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Star, Euro, Clock, Phone, Wrench } from "lucide-react";

interface ServiceHeroSectionProps {
  service: any;
}

const ServiceHeroSection = ({ service }: ServiceHeroSectionProps) => {
  if (!service) return null;

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              {service.urgence && (
                <div className="inline-flex items-center bg-red-500 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="font-bold text-sm">Urgence 24h/24</span>
                </div>
              )}
              {service.populaire && (
                <div className="inline-flex items-center bg-accent text-primary px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 mr-2" />
                  <span className="font-bold text-sm">Service populaire</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {service.nom}
            </h1>

            {service.description_courte && (
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {service.description_courte}
              </p>
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 mb-2">Tarif indicatif</p>
                  <div className="flex items-center space-x-2">
                    <Euro className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-bold text-white">
                      {service.prix_min}€ - {service.prix_max}€
                    </span>
                  </div>
                </div>
                <Clock className="w-10 h-10 text-white/20" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:0974735472"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-50 transition-all shadow-md text-lg"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="relative">
            {service.coverImage?.url ? (
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.coverImage.url}`}
                  alt={service.nom}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            ) : (
              <div className="h-[400px] lg:h-[500px] bg-white/10 rounded-xl flex items-center justify-center">
                <Wrench className="w-32 h-32 text-white/30" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
