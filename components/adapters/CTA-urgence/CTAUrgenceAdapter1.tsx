import type { CtaUrgenceSection } from "@/lib/strapi-types";
import CallButton from "@/components/ui/CallButton";
import { Clock } from "lucide-react";

interface CTAUrgenceAdapterProps {
  data: CtaUrgenceSection;
}

/**
 * Version 1 : Design professionnel avec bleu marine et vert
 * Layout : Bordure gauche accentuée + icônes
 */
export default function CTAUrgenceAdapter1({ data }: CTAUrgenceAdapterProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-white rounded-2xl shadow-card overflow-hidden">
          {/* Bordure gauche colorée */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary to-success"></div>
          
          <div className="grid md:grid-cols-[1fr_auto] gap-8 p-8 md:p-12 pl-10 md:pl-14 items-center">
            {/* Contenu principal */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  {data.title}
                </h2>
              </div>
              
              <p className="text-lg text-neutral-700 font-semibold">
                {data.description.split('\n')[0]}
              </p>
              <p className="text-neutral-600">
                {data.description.split('\n')[1] || `Nos experts sont disponibles 7j/7 24h/24`}
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center md:items-end gap-4">
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
