import type { CtaUrgenceSection } from "@/lib/strapi-types";
import CallButton from "@/components/ui/CallButton";
import { Phone, Clock, CheckCircle } from "lucide-react";

interface CTAUrgenceAdapterProps {
  data: CtaUrgenceSection;
}

/**
 * Version 4 : Design minimaliste avec bordures et icônes vertes
 * Layout : Card avec liste de features
 */
export default function CTAUrgenceAdapter4({ data }: CTAUrgenceAdapterProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden hover:border-success/50 transition-colors duration-300">
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 p-8 md:p-12 items-center">
            {/* Icône gauche */}
            <div className="hidden md:flex flex-col items-center gap-4">
              <a
                href={`tel:${data.phoneNumber}`}
                className="w-24 h-24 bg-gradient-to-br from-success to-success-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group rotate-3 hover:rotate-0"
                aria-label={`Appeler ${data.phoneNumber}`}
              >
                <Phone className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Contenu central */}
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  {data.title}
                </h2>
                <p className="text-lg text-neutral-700 font-semibold">
                  {data.description.split('\n')[0]}
                </p>
              </div>

              {/* Features list */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-600 text-sm">Intervention rapide</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-600 text-sm">Artisans qualifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-600 text-sm">
                    {data.description.split('\n')[1] || `7j/7 24h/24`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-600 text-sm">Devis gratuit</span>
                </div>
              </div>
            </div>

            {/* CTA droite */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <a
                href={`tel:${data.phoneNumber}`}
                className="md:hidden w-16 h-16 bg-gradient-to-br from-success to-success-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                aria-label={`Appeler ${data.phoneNumber}`}
              >
                <Phone className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </a>
              <CallButton
                phoneNumber={data.phoneNumber}
                text={data.ctaText}
                variant="primary"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
