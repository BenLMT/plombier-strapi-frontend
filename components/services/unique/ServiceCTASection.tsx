import Link from "next/link";
import { Phone } from "lucide-react";

const ServiceCTASection = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-secondary to-secondary-700 text-white rounded-xl p-8 md:p-12 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prêt à profiter de ce service ?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Contactez-nous dès maintenant pour un devis gratuit et sans engagement
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:0974735472"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            09 74 73 54 72
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30"
          >
            Formulaire de contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTASection;
