import Link from "next/link";
import { Phone } from "lucide-react";

const ArticleMobileStickyCTA = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] safe-area-inset-bottom">
      <div className="px-4 py-3 pb-safe">
        <div className="flex items-center gap-2.5">
          <a
            href="tel:0143380323"
            className="flex-1 flex items-center justify-center space-x-2 bg-accent text-primary px-4 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all shadow-lg active:scale-[0.98] active:shadow-md"
          >
            <Phone className="w-5 h-5" />
            <span className="text-base">Appeler</span>
          </a>
          <Link
            href="/#contact"
            className="flex-1 flex items-center justify-center bg-primary text-white px-4 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-[0.98]"
          >
            <span className="text-base">Devis gratuit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleMobileStickyCTA;
