import type { HeroWithFormSection } from "@/lib/strapi-types";
import { Award, ShieldCheck, Clock, Sparkles } from "lucide-react";
import MultiStepForm from "@/components/ui/form/MultiStepForm";
import Image from "next/image";

interface HeroWithFormAdapterProps {
  data: HeroWithFormSection;
}

/**
 * Hero V4 - Version Glassmorphism ultra moderne
 * Design: Effets de verre, transparence, flou et animations fluides
 */
export default function HeroWithFormAdapter_v4({ data }: HeroWithFormAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  // Mapping des icônes
  const iconMap: Record<string, typeof ShieldCheck> = {
    'shield-check': ShieldCheck,
    'clock': Clock,
    'star': Award,
    'check': ShieldCheck,
  };
  
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden min-h-screen">
      {/* Background complexe avec image et effets */}
      <div className="absolute inset-0 z-0">
        {data.backgroundImage?.url && (
          <div className="absolute inset-0">
            <Image
              src={`${baseURL}${data.backgroundImage.url}`}
              alt={data.backgroundImage.alternativeText || data.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-primary/75 backdrop-blur-sm" />
          </div>
        )}
        
        {/* Bulles flottantes animées */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-success/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Badge flottant top */}
      {data.topBadgeText && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 w-full px-4">
          <div className="max-w-max mx-auto bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-bold text-white text-center">{data.topBadgeText}</span>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32 md:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Content - Cartes glassmorphism */}
          <div className="space-y-6">
            {/* Titre principal dans une carte glass */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-white mb-4">
                {data.title}
              </h1>
              
              {data.subtitle && (
                <p className="text-lg sm:text-xl text-white/95 leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            {/* Features en grid avec effet glass */}
            {data.features && data.features.length > 0 && (
              <div className="grid gap-4">
                {data.features.map((feature) => {
                  const IconComponent = iconMap[feature.icon] || ShieldCheck;
                  return (
                    <div 
                      key={feature.id}
                      className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                          <p className="text-sm text-white/80">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Trustpilot glass card */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="bg-success/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    {data.trustpilotScore || "Bien"}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-2xl drop-shadow-lg">★</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-white/80">Noté par</p>
                  <p className="text-lg font-bold text-white">
                    {data.trustpilotReviews || "8,521 avis"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form - Carte glass élevée */}
          <div className="lg:sticky lg:top-24">
            <div className="relative">
              {/* Glow effect derrière le formulaire */}
              <div className="absolute -inset-2 sm:-inset-4 bg-accent/20 rounded-[2rem] blur-2xl" />
              
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                <MultiStepForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos partenaires - Glass footer */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <p className="text-sm text-white/90 text-center mb-6 font-medium">
              {data.bottomText || "Une exigence reconnue, une confiance qui dure"}
            </p>
            <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
              {data.partners && data.partners.length > 0 ? (
                data.partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">{partner}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">MAE</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">ARISTON</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">BHV</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 border border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">trane</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
