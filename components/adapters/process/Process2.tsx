import type { ProcessSection } from "@/lib/strapi-types";
import { Megaphone, FileText, Award, Phone, Star, CheckCircle } from "lucide-react";

interface Process2Props {
  data: ProcessSection;
}

/**
 * Process Version 2 - Layout Vertical avec ligne de progression
 */
export default function Process2({ data }: Process2Props) {
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-purple-400 to-purple-600 hidden md:block"></div>

          {/* Steps */}
          <div className="space-y-12">
            {data.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Megaphone;
              return (
                <div key={step.id} className="relative flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8 group">
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 w-full bg-gray-50 rounded-2xl p-6 md:p-8 group-hover:bg-purple-50 transition-colors duration-300 shadow-sm hover:shadow-md">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <span className="flex-shrink-0 text-4xl sm:text-5xl font-bold text-purple-600 opacity-20">
                        {step.number}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
