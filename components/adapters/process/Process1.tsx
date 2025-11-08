import type { ProcessSection } from "@/lib/strapi-types";
import { Megaphone, FileText, Award, Phone, Star, CheckCircle } from "lucide-react";

interface Process1Props {
  data: ProcessSection;
}

/**
 * Process Version 1 - Timeline Horizontale avec connexions animées
 */
export default function Process1({ data }: Process1Props) {
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {data.title}
        </h2>

        {data.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        )}

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Line - Desktop only */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 w-full"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {data.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Megaphone;
              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon with Number Badge */}
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-purple-600">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
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
