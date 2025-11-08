import type { ProcessSection } from "@/lib/strapi-types";
import { Megaphone, FileText, Award, Phone, Star, CheckCircle } from "lucide-react";

interface Process3Props {
  data: ProcessSection;
}

/**
 * Process Version 3 - Cards modernes avec effets hover
 */
export default function Process3({ data }: Process3Props) {
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {data.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Megaphone;
            return (
              <div
                key={step.id}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                {/* Step Number - Large Background */}
                <div className="absolute top-4 right-4 text-7xl sm:text-8xl font-bold text-purple-100 opacity-30 group-hover:opacity-50 transition-opacity">
                  {step.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-purple-100 group-hover:bg-purple-600 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold mb-4">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
