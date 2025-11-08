import { CheckCircle } from "lucide-react";

interface ServiceAdvantagesSectionProps {
  avantages: any[];
}

const ServiceAdvantagesSection = ({ avantages }: ServiceAdvantagesSectionProps) => {
  if (!Array.isArray(avantages) || avantages.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Pourquoi choisir ce service ?
        </h2>
        <p className="text-lg text-gray-600">
          Des avantages concrets pour votre tranquillité
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avantages.map((avantage: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:border-primary/20 transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{avantage.title}</h3>
            <p className="text-gray-600 leading-relaxed">{avantage.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceAdvantagesSection;
