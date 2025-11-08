import Link from "next/link";
import { Phone } from "lucide-react";

interface ServicesCTASectionProps {
  hasServices: boolean;
}

const ServicesCTASection = ({ hasServices }: ServicesCTASectionProps) => {
  if (!hasServices) return null;

  return (
    <div className="mt-16 bg-gradient-to-br from-secondary to-secondary-800 text-white rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Une question sur nos services ?</h2>
      <p className="text-white/90 mb-6">
        Notre équipe est à votre disposition pour vous conseiller
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:0974735472"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition"
        >
          <Phone className="w-5 h-5 mr-2" />
          Appelez-nous
        </a>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur text-white font-bold rounded-xl hover:bg-white/20 transition border-2 border-white/30"
        >
          Formulaire de contact
        </Link>
      </div>
    </div>
  );
};

export default ServicesCTASection;
