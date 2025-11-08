import type { HeroWithFormSection } from "@/lib/strapi-types";
import { Award, ShieldCheck, Clock } from "lucide-react";
import MultiStepForm4 from "@/components/ui/form/MultiStepForm4";
import Image from "next/image";

interface HeroWithFormAdapterProps {
  data: HeroWithFormSection;
}

/**
 * Hero V2 - Avec formulaire de devis multi-steps
 * Design: Texte à gauche, image en background, formulaire à droite
 */
export default function HeroWithFormAdapter({ data }: HeroWithFormAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Mapping des icônes
  const iconMap: Record<string, typeof ShieldCheck> = {
    'shield-check': ShieldCheck,
    'clock': Clock,
    'star': Award,
    'check': ShieldCheck,
  };
  
  return (
    <section className="relative bg-primary overflow-hidden min-h-screen">
      {/* Background Image avec overlay */}
      {data.backgroundImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`${baseURL}${data.backgroundImage.url}`}
            alt={data.backgroundImage.alternativeText || data.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
        </div>
      )}

      {/* Badge "Meilleure Enseigne 2025" */}
      {data.topBadgeText && (
        <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-2 text-center z-20 border-b border-white/20">
          <p className="text-xs md:text-sm text-white">
            <Award className="inline-block w-4 h-4 mr-1 text-accent" />
            <strong>{data.topBadgeText}</strong>
          </p>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-24 md:pt-32 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-left space-y-6 md:space-y-8">
            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {data.title}
            </h1>

            {/* Sous-titre */}
            {data.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-xl mx-auto lg:mx-0">
                {data.subtitle}
              </p>
            )}

            {/* Features */}
            {data.features && data.features.length > 0 && (
              <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                {data.features.map((feature) => {
                  const IconComponent = iconMap[feature.icon] || ShieldCheck;
                  return (
                    <div key={feature.id} className="flex items-center gap-4 text-left">
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

            {/* Trustpilot Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
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

          {/* Right Form - Multi-Steps (Client Component isolé) */}
          <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
            <MultiStepForm4 />
          </div>
        </div>
      </div>

      {/* Logos partenaires en bas */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-white/80 text-center mb-4">
            {data.bottomText || "Une exigence reconnue, une confiance qui dure"}
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {data.partners && data.partners.length > 0 ? (
              data.partners.map((partner, index) => (
                <div key={index} className="text-white/70 font-bold text-sm">
                  {partner}
                </div>
              ))
            ) : (
              <>
                <div className="text-white/70 font-bold text-sm">MAE</div>
                <div className="text-white/70 font-bold text-sm">ARISTON</div>
                <div className="text-white/70 font-bold text-sm">BHV</div>
                <div className="text-white/70 font-bold text-sm">trane</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
