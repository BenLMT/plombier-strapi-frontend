import type { ProcessSection } from "@/lib/strapi-types";
import { Megaphone, FileText, Award, Phone, Star, CheckCircle } from "lucide-react";

interface ProcessAdapterProps {
  data: ProcessSection;
}

/**
 * Adaptateur pour le Process Section - Version dynamique
 */
export default function ProcessAdapter({ data }: ProcessAdapterProps) {
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
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {data.title}
        </h2>

        {data.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {data.steps.map((step) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Megaphone;
            return (
              <div key={step.id} className="text-center">
                {/* Number Badge */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">{step.number}.</span>
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
