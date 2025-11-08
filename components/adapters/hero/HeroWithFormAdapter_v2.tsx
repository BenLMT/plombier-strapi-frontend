import type { HeroWithFormSection } from "@/lib/strapi-types";
import { Award, ShieldCheck, Clock } from "lucide-react";
import MultiStepForm from "@/components/ui/form/MultiStepForm";
import Image from "next/image";

interface HeroWithFormAdapterProps {
  data: HeroWithFormSection;
}

/**
 * Hero V2 - Version alternative avec design géométrique moderne
 * Design: Cartes flottantes avec effet de profondeur et layout en diagonale
 */
export default function HeroWithFormAdapter_v2({ data }: HeroWithFormAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Mapping des icônes
  const iconMap: Record<string, typeof ShieldCheck> = {
    'shield-check': ShieldCheck,
    'clock': Clock,
    'star': Award,
    'check': ShieldCheck,
  };
  
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden min-h-screen">
      {/* Formes géométriques décoratives en arrière-plan */}
      <div className="absolute inset-0 z-0">
        {/* Background Image avec effet de masque diagonal */}
        {data.backgroundImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={`${baseURL}${data.backgroundImage.url}`}
              alt={data.backgroundImage.alternativeText || data.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              priority
              quality={85}
            />
          </div>
        )}
        
        {/* Cercles décoratifs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Badge "Meilleure Enseigne 2025" - Version moderne */}
      {data.topBadgeText && (
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-6 py-2 shadow-lg">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-primary">{data.topBadgeText}</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Content - Cartes empilées */}
          <div className="space-y-6 md:space-y-8">
            {/* Carte principale avec titre */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
                {data.title}
              </h1>
              
              {data.subtitle && (
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            {/* Features en cartes individuelles avec effet hover */}
            {data.features && data.features.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {data.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon] || ShieldCheck;
                  return (
                    <div 
                      key={feature.id}
                      className="group bg-white/5 backdrop-blur-lg rounded-2xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{ 
                        transform: `translateX(${index * 4}px)`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg sm:text-xl font-bold text-white mb-1">{feature.title}</p>
                          <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Trustpilot Badge - Version carte */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="bg-success text-white px-4 py-2 rounded-full font-bold text-sm">
                    {data.trustpilotScore || "Bien"}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-success text-xl">★</span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-[200px] text-center sm:text-left">
                  <p className="text-sm text-primary/70">Basé sur</p>
                  <p className="text-lg font-bold text-primary">
                    {data.trustpilotReviews || "8,521 avis"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form - Position sticky pour suivre le scroll */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform lg:translate-y-8">
              <MultiStepForm />
            </div>
          </div>
        </div>
      </div>

      {/* Logos partenaires - Version moderne avec cartes */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-sm text-white/80 text-center mb-6 font-medium">
            {data.bottomText || "Une exigence reconnue, une confiance qui dure"}
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            {data.partners && data.partners.length > 0 ? (
              data.partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-white font-bold text-xs sm:text-sm">{partner}</span>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-white font-bold text-xs sm:text-sm">MAE</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-white font-bold text-xs sm:text-sm">ARISTON</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-white font-bold text-xs sm:text-sm">BHV</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-white font-bold text-xs sm:text-sm">trane</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
