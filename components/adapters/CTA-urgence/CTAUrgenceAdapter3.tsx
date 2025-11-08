import type { CtaUrgenceSection } from "@/lib/strapi-types";
import CallButton from "@/components/ui/CallButton";
import { Wrench, ArrowRight } from "lucide-react";

interface CTAUrgenceAdapterProps {
  data: CtaUrgenceSection;
}

/**
 * Version 3 : Design moderne avec gradient bleu et disposition asymétrique
 * Layout : Split screen avec illustration
 */
export default function CTAUrgenceAdapter3({ data }: CTAUrgenceAdapterProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Pattern background subtil */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-[1.5fr_1fr] gap-8 p-8 md:p-12">
            {/* Contenu gauche */}
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-white/90 font-medium text-sm">Disponible maintenant</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {data.title}
              </h2>
              
              <div className="space-y-3">
                <p className="text-xl text-white/95 font-semibold">
                  {data.description.split('\n')[0]}
                </p>
                <p className="text-white/80 text-lg">
                  {data.description.split('\n')[1] || `Nos experts sont disponibles 7j/7 24h/24`}
                </p>
              </div>
              
              <CallButton
                phoneNumber={data.phoneNumber}
                text={data.ctaText}
                variant="primary"
                size="lg"
                className="group"
              />
            </div>

            {/* Illustration droite */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
                <a
                  href={`tel:${data.phoneNumber}`}
                  className="relative bg-white/20 backdrop-blur-md w-48 h-48 rounded-full flex items-center justify-center border-4 border-white/30 hover:border-white/50 hover:bg-white/30 transition-all duration-300 cursor-pointer group"
                  aria-label={`Appeler nos plombiers - ${data.phoneNumber}`}
                >
                  <Wrench className="w-24 h-24 text-white rotate-45 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500" />
                </a>
                {/* Cercles décoratifs */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
