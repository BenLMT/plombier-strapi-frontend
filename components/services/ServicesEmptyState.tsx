import { Wrench } from "lucide-react";
import Link from "next/link";

const ServicesEmptyState = () => {
  return (
    <div className="text-center py-20">
      <Wrench className="w-20 h-20 mx-auto mb-6 text-gray-300" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Aucun service disponible
      </h2>
      <p className="text-gray-600 mb-8">
        Les services seront bientôt disponibles. Contactez-nous pour plus d'informations.
      </p>
      <Link
        href="/#contact"
        className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition"
      >
        Nous contacter
      </Link>
    </div>
  );
};

export default ServicesEmptyState;
