import Link from "next/link";
import { Phone } from "lucide-react";

export default function BlogHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Plomberie Daniel</h1>
              <p className="text-xs text-gray-600">Paris 11ème</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Accueil
            </Link>
            <Link href="/blog" className="text-blue-600 font-semibold">
              Blog
            </Link>
            <Link href="/annuaire" className="text-gray-700 hover:text-blue-600 transition">
              Annuaire
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <a
            href="tel:0143380323"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">01.43.38.03.23</span>
          </a>
        </div>
      </div>
    </header>
  );
}
