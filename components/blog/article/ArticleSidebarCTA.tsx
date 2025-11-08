import Link from "next/link";
import { Phone } from "lucide-react";

const ArticleSidebarCTA = () => {
  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-8">
      <div className="bg-gradient-to-br from-primary to-primary-800 text-white rounded-2xl p-8 shadow-xl sticky top-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Besoin d'aide ?</h3>
          <p className="text-primary-100 mb-6">Intervention rapide 24h/7j</p>
          <a
            href="tel:0143380323"
            className="block w-full bg-accent text-primary px-6 py-4 rounded-lg font-bold hover:bg-accent/90 transition shadow-lg mb-3"
          >
            01 43 38 03 23
          </a>
          <Link
            href="/#contact"
            className="block w-full bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default ArticleSidebarCTA;
