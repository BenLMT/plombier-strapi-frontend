"use client";

import { useState } from "react";
import type { FaqSection } from "@/lib/strapi-types";
import { ChevronDown, MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";

interface FAQAdapterProps {
  data: FaqSection;
}

/**
 * Adaptateur pour le FAQ Section - Version dynamique
 */
export default function FAQAdapter({ data }: FAQAdapterProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-gray-700">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.questions.map((faq, index) => (
            <Card key={faq.id} hover={false} className="overflow-hidden">
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
                  className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
