import type { CtaUrgenceSection } from "@/lib/strapi-types";
import CallButton from "@/components/ui/CallButton";
import { Wrench } from "lucide-react";

interface CTAUrgenceAdapterProps {
  data: CtaUrgenceSection;
}

/**
 * Adaptateur pour le CTA Urgence Section - Version dynamique
 * Garde le design original avec fond violet et cercle jaune
 */
export default function CTAUrgenceAdapter({ data }: CTAUrgenceAdapterProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-secondary rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content - DYNAMIQUE */}
            <div className="text-white space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {data.title}
              </h2>
              <p className="text-lg text-white/90 font-semibold">
                {data.description.split('\n')[0]}
              </p>
              <p className="text-white/90">
                {data.description.split('\n')[1] || `Nos experts sont disponibles 7j/7 24h/24`}
              </p>
              
              <CallButton
                phoneNumber={data.phoneNumber}
                text={data.ctaText}
                variant="primary"
                size="lg"
                className="mt-4"
              />
            </div>

            {/* Right Decoration */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-48 h-48 bg-accent rounded-full flex items-center justify-center animate-bounce-slow">
                  <Wrench className="w-24 h-24 text-primary rotate-45" />
                </div>
                {/* Curved Arrow pointing to CTA */}
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-accent">
                    <path 
                      d="M10 40 Q 40 10, 70 40" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
