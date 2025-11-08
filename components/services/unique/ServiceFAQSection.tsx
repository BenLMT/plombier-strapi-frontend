interface ServiceFAQSectionProps {
  faq: any[];
}

const ServiceFAQSection = ({ faq }: ServiceFAQSectionProps) => {
  if (!Array.isArray(faq) || faq.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Questions fréquentes
        </h2>
        <p className="text-lg text-gray-600">
          Tout ce que vous devez savoir
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12">
        <div className="space-y-4">
          {faq.map((item: any, index: number) => (
            <details key={index} className="group border-b border-gray-200 pb-4 last:border-0">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between py-4 hover:text-primary transition-colors">
                <span className="flex-1">{item.question}</span>
                <div className="ml-4 flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-open:bg-primary transition-all shadow-sm">
                  <span className="text-primary group-open:text-white group-open:rotate-180 transition-all text-xl">+</span>
                </div>
              </summary>
              <p className="text-gray-600 leading-relaxed mt-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQSection;
