"use client";

import { Megaphone, FileText, Award } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      icon: Megaphone,
      iconColor: "text-secondary-500",
      title: "Vous décrivez votre urgence",
      description: "Contactez-nous en ligne ou au téléphone. Un plombier vous recontacte immédiatement pour un RDV. Aucun acompte requis.",
    },
    {
      number: 2,
      icon: FileText,
      iconColor: "text-secondary-500",
      title: "Le devis est 100% gratuit",
      description: "Notre intervenant ? Un expert qualifié, assuré et plébiscité par nos clients.",
    },
    {
      number: 3,
      icon: Award,
      iconColor: "text-secondary-500",
      title: "Intervention garantie 1 an",
      description: "Vous ne payez qu'une fois le travail terminé. Un souci ? Notre équipe assure le suivi et le plombier revient."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Notre méthode : simple, claire, efficace
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="text-center">
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
