import type { CtaUrgenceSection } from "@/lib/strapi-types";
import CallButton from "@/components/ui/CallButton";
import { AlertCircle } from "lucide-react";

interface CTAUrgenceAdapterProps {
  data: CtaUrgenceSection;
}

/**
 * Version 2 : Design sobre avec fond bleu marine et touches de vert
 * Layout : Card centrée avec badge urgence
 */
export default function CTAUrgenceAdapter2({ data }: CTAUrgenceAdapterProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-primary rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Decoration subtile */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-success/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center space-y-6">
            {/* Badge urgence */}
            <a
              href={`tel:${data.phoneNumber}`}
              className="inline-flex items-center gap-2 bg-success px-4 py-2 rounded-full hover:bg-success-600 transition-colors duration-300 cursor-pointer group"
              aria-label={`Urgence Plomberie - Appeler ${data.phoneNumber}`}
            >
              <AlertCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold text-sm uppercase tracking-wide">
                Urgence Plomberie
              </span>
            </a>

            {/* Contenu */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {data.title}
              </h2>
              <p className="text-xl text-white/95 font-semibold">
                {data.description.split('\n')[0]}
              </p>
              <p className="text-white/80 text-lg">
                {data.description.split('\n')[1] || `Nos experts sont disponibles 7j/7 24h/24`}
              </p>
            </div>
            
            {/* CTA */}
            <div className="pt-4">
              <CallButton
                phoneNumber={data.phoneNumber}
                text={data.ctaText}
                variant="primary"
                size="lg"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
