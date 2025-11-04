"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "🚨 Pourquoi faire appel à vous plutôt qu'un autre ?",
      answer:
        "<strong>Nous avons pignon sur rue depuis 1980 !</strong> Notre magasin au 99 rue Saint-Maur (Paris 11) est un gage de notre sérieux. Contrairement aux sites anonymes, nous assurons un service après-vente et vous pouvez nous rencontrer. Nous sommes des artisans honnêtes qui fidélisent leur clientèle.",
    },
    {
      question: "💰 Vos tarifs sont-ils vraiment \"pas chers\" ?",
      answer:
        "Nos tarifs sont étudiés au plus juste pour un travail professionnel et soigné. Nous proposons des promotions toute l'année sur notre site et offrons des prix avantageux à nos clients fidèles. La transparence est notre priorité : le prix est annoncé avant intervention.",
    },
    {
      question: "🔧 Vous occupez-vous aussi de rénovation ?",
      answer:
        "<strong>Oui, nous sommes une entreprise tout corps d'état.</strong> Cela signifie que nous gérons l'intégralité de vos travaux de rénovation (salle de bain, appartement complet...). Vous n'avez qu'un seul interlocuteur : la Plomberie Daniel. Nous coordonnons électricien, carreleur, peintre, etc.",
    },
    {
      question: "📄 Êtes-vous agréé par les assurances ?",
      answer:
        "<strong>Absolument.</strong> Nous sommes qualifiés pour effectuer des recherches de fuite et établir des devis de remise en état pour votre assurance. Notre expertise vous garantit un dossier solide pour la prise en charge des dégâts des eaux.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Questions Fréquentes</h2>
          <p className="text-xl text-gray-600">
            Toutes les réponses à vos questions sur nos interventions d'urgence
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item bg-white rounded-xl shadow-sm">
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
