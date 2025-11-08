import type { ProcessSection } from "@/lib/strapi-types";
import { Megaphone, FileText, Award, Phone, Star, CheckCircle, ArrowRight } from "lucide-react";

interface Process4Props {
  data: ProcessSection;
}

/**
 * Process Version 4 - Layout en zigzag alternant gauche-droite
 */
export default function Process4({ data }: Process4Props) {
  // Mapping des icônes
  const iconMap = {
    'megaphone': Megaphone,
    'file-text': FileText,
    'award': Award,
    'phone': Phone,
    'star': Star,
    'check-circle': CheckCircle,
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Zigzag Layout */}
        <div className="space-y-16 md:space-y-24">
          {data.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Megaphone;
            const isEven = index % 2 === 0;

            return (
              <div key={step.id} className="relative">
                {/* Connector Arrow - Desktop only */}
                {index !== data.steps.length - 1 && (
                  <div className={`hidden md:flex absolute ${isEven ? 'right-0 -mr-12' : 'left-0 -ml-12'} bottom-0 -mb-16 text-purple-300`}>
                    <ArrowRight className={`w-8 h-8 ${isEven ? 'rotate-90' : 'rotate-90'}`} />
                  </div>
                )}

                {/* Step Container */}
                <div className={`flex flex-col md:flex-row items-center gap-8 ${!isEven && 'md:flex-row-reverse'}`}>
                  {/* Icon Side */}
                  <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                      {/* Number Background */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl md:text-9xl font-bold text-purple-100">
                          {step.number}
                        </span>
                      </div>

                      {/* Icon Circle */}
                      <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute z-20 -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-base md:text-lg font-bold text-purple-600">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-600">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {step.description}
                      </p>

                      {/* Decorative Element */}
                      <div className={`mt-6 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
