import Link from "next/link";
import { Wrench, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const servicesLinks = [
    { name: "Dépannage Urgent", href: "/services/depannage-urgent" },
    { name: "Débouchage", href: "/services/debouchage" },
    { name: "Fuite d'eau", href: "/services/fuite-eau" },
    { name: "Ballon d'eau chaude", href: "/services/ballon-eau-chaude" },
    { name: "Installation", href: "/services/installation" },
    { name: "Rénovation", href: "/services/renovation" },
  ];

  const parisLinks = [
    { name: "Plombier Paris 1er", href: "/plombier/paris-1" },
    { name: "Plombier Paris 11ème", href: "/plombier/paris-11" },
    { name: "Plombier Paris 15ème", href: "/plombier/paris-15" },
    { name: "Plombier Paris 18ème", href: "/plombier/paris-18" },
    { name: "Plombier Paris 20ème", href: "/plombier/paris-20" },
    { name: "Tous les arrondissements", href: "/#arrondissements" },
  ];

  const legalLinks = [
    { name: "Mentions Légales", href: "/mentions-legales" },
    { name: "CGV", href: "/cgv" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="bg-blue-600 rounded-xl p-2.5 group-hover:bg-blue-700 transition-colors">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Plomberie Paris</span>
                <p className="text-xs text-gray-400">Votre plombier de confiance</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Service de plomberie professionnel à Paris. Intervention rapide 7j/7, 24h/24. 
              Artisans qualifiés et assurés.
            </p>
            <div className="text-xs text-gray-400">
              <p>SIRET: XXX XXX XXX XXXXX</p>
              <p>Assurance décennale</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-400">Services</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Paris */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-400">Paris</h4>
            <ul className="space-y-2">
              {parisLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-400">Contact</h4>
            <div className="space-y-4">
              <a href="tel:0974735472" className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    09 74 73 54 72
                  </div>
                  <div className="text-xs text-gray-400">Disponible 24h/24 - 7j/7</div>
                </div>
              </a>
              
              <a href="mailto:contact@plombier-paris.fr" className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300 group-hover:text-blue-400 transition-colors">
                  contact@plombier-paris.fr
                </div>
              </a>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Paris & Île-de-France</div>
                  <div className="text-xs text-gray-400">Tous arrondissements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Plomberie Paris. Tous droits réservés.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
