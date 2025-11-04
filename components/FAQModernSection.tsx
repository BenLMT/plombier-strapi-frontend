"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import Card from "./ui/Card";

export default function FAQModernSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Intervenez-vous dans tout Paris ?",
      answer: "Oui, absolument. Nos artisans plombiers couvrent l'intégralité de Paris. Nous intervenons dans tous les arrondissements, du 1er au 20ème, que vous soyez sur la Rive Droite ou la Rive Gauche.",
    },
    {
      question: "Quels sont vos délais pour une urgence plomberie ?",
      answer: "Nous savons que chaque minute compte. Pour une urgence à Paris, nous nous engageons à ce qu'un plombier soit chez vous en moins de 2 heures, de jour comme de nuit, en fonction du trafic.",
    },
    {
      question: "Puis-je annuler un rendez-vous si je me suis trompé ?",
      answer: "Bien sûr. Vous pouvez annuler votre rendez-vous sans aucun frais à tout moment avant l'arrivée de l'artisan. Un simple appel suffit.",
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Vous pouvez régler l'intervention une fois celle-ci terminée, directement auprès de l'artisan. Nous acceptons la carte bancaire (CB) ainsi que les espèces.",
    },
    {
      question: "Comment sélectionnez-vous vos plombiers à Paris ?",
      answer: "Nous travaillons exclusivement avec des artisans parisiens certifiés, diplômés et couverts par une assurance professionnelle (Responsabilité Civile et décennale). Ils sont rigoureusement sélectionnés pour leur expertise technique et leur sens du service.",
    },
    {
      question: "Dois-je payer un acompte avant l'intervention ?",
      answer: "Non. Chez nous, la confiance est primordiale. Vous ne payez absolument rien avant que le travail ne soit effectué et validé par vos soins. Le devis est gratuit et aucun acompte n'est demandé.",
    },
    {
      question: "Êtes-vous agréés par les assurances ?",
      answer: "Oui. Nos artisans sont habitués à travailler avec toutes les grandes compagnies d'assurance. Nous vous fournissons une facture détaillée conforme aux exigences de votre assurance pour faciliter votre remboursement en cas de dégât des eaux ou autre sinistre couvert.",
    },
    {
      question: "Mon dépannage est-il garanti si le problème revient ?",
      answer: "Absolument. Toutes nos interventions sont garanties 1 an (pièces et main-d'œuvre). Si le même problème resurgit durant cette période, notre équipe assure le suivi et le professionnel revient gratuitement pour résoudre le souci.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-secondary-100 rounded-2xl p-4">
              <MessageCircle className="w-12 h-12 text-secondary-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-gray-700">
            Nos réponses à vos interrogations les plus fréquentes :
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} hover={false} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-start justify-between gap-4 p-6"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {faq.question}
                  </h3>
                  {openIndex === index && (
                    <div className="text-gray-700 leading-relaxed mt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-secondary-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Card>
          ))}
        </div>

        {/* Link to all questions */}
        <div className="text-center mt-8">
          <a
            href="/faq"
            className="text-secondary-600 hover:text-secondary-700 font-semibold inline-flex items-center gap-2 group"
          >
            Toutes les questions
            <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
