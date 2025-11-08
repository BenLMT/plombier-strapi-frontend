import type { HeroWithFormSection } from "@/lib/strapi-types";
import { Award, ShieldCheck, Clock } from "lucide-react";
import MultiStepForm2 from "@/components/ui/form/MultiStepForm2";
import Image from "next/image";

interface HeroWithFormAdapterProps {
  data: HeroWithFormSection;
}

/**
 * Hero V3 - Version minimaliste avec split diagonal
 * Design: Division diagonale de l'écran, style épuré et moderne
 */
export default function HeroWithFormAdapter_v3({ data }: HeroWithFormAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Mapping des icônes
  const iconMap: Record<string, typeof ShieldCheck> = {
    'shield-check': ShieldCheck,
    'clock': Clock,
    'star': Award,
    'check': ShieldCheck,
  };
  
  return (
    <section className="relative bg-primary lg:bg-white overflow-hidden min-h-screen">
      {/* Split diagonal background */}
      <div className="absolute inset-0 z-0">
        {/* Côté gauche - Primaire avec image (toujours visible) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-primary">
          {data.backgroundImage?.url && (
            <>
              <Image
                src={`${baseURL}${data.backgroundImage.url}`}
                alt={data.backgroundImage.alternativeText || data.title}
                fill
                className="object-cover opacity-30"
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-primary/80" />
            </>
          )}
        </div>
        
        {/* Côté droit - Blanc cassé (uniquement sur grand écran) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 left-1/2 bg-gray-50" />
        
        {/* Effet diagonal - Ligne séparatrice (uniquement sur grand écran) */}
        <div className="hidden lg:block absolute inset-y-0 left-1/2 w-32 bg-gradient-to-r from-primary to-transparent transform -skew-x-12 origin-top-left" />
      </div>

      {/* Badge top - Version épurée */}
      {data.topBadgeText && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-primary">{data.topBadgeText}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Sur fond primary */}
          <div className="text-white space-y-8 text-center lg:text-left">
            {/* Titre avec ligne accent */}
            <div>
              <div className="w-20 h-1 bg-accent mb-6 rounded-full mx-auto lg:mx-0" />
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                {data.title}
              </h1>
              
              {data.subtitle && (
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {data.subtitle}
                </p>
              )}
            </div>

            {/* Features - Liste minimaliste */}
            {data.features && data.features.length > 0 && (
              <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
                {data.features.map((feature) => {
                  const IconComponent = iconMap[feature.icon] || ShieldCheck;
                  return (
                    <div key={feature.id} className="flex items-start gap-4 group text-left">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-white/75 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Trustpilot - Version inline minimaliste */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-2xl">★</span>
                ))}
              </div>
              <div className="border-l border-white/30 pl-4">
                <p className="text-sm text-white/80">
                  <span className="font-bold text-white text-base">{data.trustpilotScore || "Bien"}</span>
                  {" · "}
                  <span className="text-white/90">{data.trustpilotReviews || "8,521 avis"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Form - Sur fond blanc */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <MultiStepForm2 />
            </div>
          </div>
        </div>
      </div>

      {/* Logos partenaires - Version minimaliste en ligne */}
      <div className="relative z-10 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-600 font-medium text-center md:text-left">
              {data.bottomText || "Une exigence reconnue, une confiance qui dure"}
            </p>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {data.partners && data.partners.length > 0 ? (
                data.partners.map((partner, index) => (
                  <span 
                    key={index} 
                    className="text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300"
                  >
                    {partner}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300">MAE</span>
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300">ARISTON</span>
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300">BHV</span>
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300">trane</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
