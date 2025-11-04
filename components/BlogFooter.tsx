import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function BlogFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Plomberie Daniel</h3>
            <p className="text-gray-400 text-sm mb-4">
              Artisan plombier à Paris 11ème. Intervention rapide 24h/7j pour tous vos problèmes de plomberie.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Disponible 24h/7j</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/annuaire" className="text-gray-400 hover:text-white transition">
                  Annuaire
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Dépannage d'urgence</li>
              <li>Débouchage canalisations</li>
              <li>Réparation fuite</li>
              <li>Installation sanitaire</li>
              <li>Rénovation salle de bain</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:0143380323" className="text-gray-400 hover:text-white transition">
                  01.43.38.03.23
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:contact@plomberie-daniel.fr" className="text-gray-400 hover:text-white transition">
                  contact@plomberie-daniel.fr
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Paris 11ème</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Plomberie Daniel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
