import type { HeroSection } from "@/lib/strapi-types";
import { Award, ShieldCheck, Clock, ArrowRight, Phone } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import Image from "next/image";

interface HeroAdapterProps {
  data: HeroSection;
}

/**
 * Adaptateur pour le Hero Section - Version dynamique
 * Utilise les données provenant de Strapi
 */
export default function HeroAdapter({ data }: HeroAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Mapping des icônes (doit correspondre aux valeurs de l'enum dans Strapi)
  const iconMap: Record<string, typeof ShieldCheck> = {
    'shield-check': ShieldCheck,
    'clock': Clock,
    'arrow-right': ArrowRight,
    'phone': Phone,
    'star': Award,
    'check': ShieldCheck,
  };
  
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Badge "Meilleure Enseigne 2025" - DYNAMIQUE */}
      {data.topBadgeText && (
        <div className="absolute top-0 left-0 right-0 bg-neutral-50 py-2 text-center z-20 border-b border-neutral-200">
          <p className="text-xs md:text-sm text-neutral-700">
            <Award className="inline-block w-4 h-4 mr-1 text-accent" />
            <strong>{data.topBadgeText}</strong>
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 min-h-[600px] pt-12">
        {/* Left Content - Fond Bleu Marine */}
        <div className="bg-primary text-white px-6 md:px-12 py-16 md:py-20 flex items-center relative">
          <div className="max-w-xl w-full">
            {/* Titre principal - DYNAMIQUE */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-10">
              {data.title}
            </h1>

            {/* Features - DYNAMIQUES */}
            {data.features && data.features.length > 0 && (
              <div className="space-y-5 mb-10">
                {data.features.map((feature) => {
                  console.log('Feature icon from Strapi:', feature.icon, 'Mapped to:', iconMap[feature.icon]?.name);
                  const IconComponent = iconMap[feature.icon] || ShieldCheck;
                  return (
                    <div key={feature.id} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{feature.title}</p>
                        <p className="text-sm text-white/70">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA Button - DYNAMIQUE */}
            <div className="mb-8">
              <ActionButton
                text={data.ctaText || "Je décris mon besoin"}
                url={data.ctaUrl || 'tel:0974735472'}
                icon="arrow-right"
                variant="primary"
                size="lg"
                className="text-base md:text-lg font-bold shadow-2xl group hover:scale-105 transition-transform w-full sm:w-auto"
              />
            </div>

            {/* Trustpilot Badge - DYNAMIQUE */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10">
              <p className="text-xs font-bold bg-success text-white px-3 py-1 rounded-full">
                {data.trustpilotScore || "Bien"}
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-success text-base">★</span>
                ))}
              </div>
              <p className="text-sm text-white/90">
                <strong>{data.trustpilotReviews || "8,521 avis"}</strong>
              </p>
            </div>
          </div>

          {/* Wave Shape on the right side */}
          <div className="absolute right-0 top-0 bottom-0 w-16 overflow-hidden hidden lg:block">
            <svg className="absolute right-0 h-full w-32" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d="M0,0 Q50,400 0,800 L0,800 L0,0 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Image - DYNAMIQUE */}
        <div className="relative bg-neutral-100 flex items-center justify-center overflow-hidden">
          {data.backgroundImage?.url ? (
            <Image
              src={`${baseURL}${data.backgroundImage.url}`}
              alt={data.backgroundImage.alternativeText || data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              quality={85}
            />
          ) : (
            <Image
              src="/plombier-famille.png"
              alt="Plombier professionnel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              quality={85}
            />
          )}
          
          {/* Badge "Nouveau site" en bas à droite */}
          <div className="absolute bottom-8 right-8 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-10">
            <p className="text-xs font-bold">Nouveau site</p>
            <p className="text-xs">Le même mais en mieux</p>
          </div>
        </div>
      </div>

      {/* Logos partenaires en bas - DYNAMIQUE */}
      <div className="bg-white py-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-neutral-500 text-center mb-4">
            {data.bottomText || "Une exigence reconnue, une confiance qui dure"}
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            {data.partners && data.partners.length > 0 ? (
              data.partners.map((partner, index) => (
                <div key={index} className="text-neutral-700 font-bold text-sm">
                  {partner}
                </div>
              ))
            ) : (
              <>
                <div className="text-neutral-700 font-bold text-sm">MAE</div>
                <div className="text-neutral-700 font-bold text-sm">ARISTON</div>
                <div className="text-neutral-700 font-bold text-sm">BHV</div>
                <div className="text-neutral-700 font-bold text-sm">trane</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
