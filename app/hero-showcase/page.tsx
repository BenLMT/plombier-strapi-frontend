import {
  HeroOriginal,
  HeroModern,
  HeroMinimal,
  HeroGlass
} from "@/components/adapters/hero";
import type { HeroWithFormSection } from "@/lib/strapi-types";

/**
 * Page de démonstration des différentes versions du Hero
 * Utile pour comparer visuellement et choisir la version à utiliser
 */
export default function HeroShowcasePage() {
  // Données de démonstration (identiques pour toutes les versions)
  const demoData: HeroWithFormSection = {
    __component: "sections.hero-with-form",
    id: 1,
    title: "Plombier d'Urgence à Paris 24h/24",
    subtitle: "Intervention rapide en moins de 30 minutes. Devis gratuit et transparent.",
    topBadgeText: "⭐ Meilleure Enseigne de Plomberie 2025",
    backgroundImage: {
      id: 1,
      url: "/plombier-famille.png",
      alternativeText: "Plombier professionnel",
      width: 1920,
      height: 1080,
    },
    features: [
      {
        id: 1,
        icon: "clock",
        title: "Intervention Rapide",
        description: "Disponible 24h/24 et 7j/7, intervention en moins de 30 minutes",
      },
      {
        id: 2,
        icon: "shield-check",
        title: "Garantie 2 ans",
        description: "Tous nos travaux sont garantis 2 ans, pièces et main d'œuvre",
      },
      {
        id: 3,
        icon: "star",
        title: "Artisans Certifiés",
        description: "Équipe d'experts certifiés avec +15 ans d'expérience",
      },
    ],
    trustpilotScore: "Excellent",
    trustpilotReviews: "8,521 avis",
    bottomText: "Partenaires de confiance depuis 1998",
    partners: ["MAE", "ARISTON", "BHV", "trane"],
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header de la page */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🎨 Hero Showcase - Comparaison des Versions
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Toutes les versions utilisent exactement les mêmes données Strapi
          </p>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="bg-white border-b shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex gap-4 overflow-x-auto">
            <a href="#original" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
              Version Originale
            </a>
            <a href="#modern" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
              Version Modern
            </a>
            <a href="#minimal" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
              Version Minimal
            </a>
            <a href="#glass" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
              Version Glass
            </a>
          </nav>
        </div>
      </div>

      {/* Section 1 - Version Originale */}
      <section id="original" className="scroll-mt-32">
        <div className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Version Originale</h2>
            <p className="text-gray-300">
              Design classique et professionnel. Layout horizontal traditionnel.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-semibold">Léger</span>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">Professionnel</span>
              <span className="px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold">Sobre</span>
            </div>
          </div>
        </div>
        <HeroOriginal data={demoData} />
      </section>

      {/* Section 2 - Version Modern */}
      <section id="modern" className="scroll-mt-32 mt-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Version Modern (v2)</h2>
            <p className="text-blue-100">
              Cartes flottantes avec effets de profondeur. Design dynamique et moderne.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-semibold text-gray-900">Moderne</span>
              <span className="px-3 py-1 bg-pink-600 rounded-full text-xs font-semibold">Effets Hover</span>
              <span className="px-3 py-1 bg-indigo-600 rounded-full text-xs font-semibold">Dynamique</span>
            </div>
          </div>
        </div>
        <HeroModern data={demoData} />
      </section>

      {/* Section 3 - Version Minimal */}
      <section id="minimal" className="scroll-mt-32 mt-12">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Version Minimal (v3)</h2>
            <p className="text-gray-300">
              Split diagonal avec design épuré. Minimaliste et élégant.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-semibold">Très Léger</span>
              <span className="px-3 py-1 bg-gray-600 rounded-full text-xs font-semibold">Épuré</span>
              <span className="px-3 py-1 bg-yellow-600 rounded-full text-xs font-semibold">Premium</span>
            </div>
          </div>
        </div>
        <HeroMinimal data={demoData} />
      </section>

      {/* Section 4 - Version Glass */}
      <section id="glass" className="scroll-mt-32 mt-12">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Version Glass (v4)</h2>
            <p className="text-purple-100">
              Glassmorphism ultra moderne. Effets de verre et animations fluides.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-semibold text-gray-900">Innovant</span>
              <span className="px-3 py-1 bg-pink-500 rounded-full text-xs font-semibold">Animations</span>
              <span className="px-3 py-1 bg-purple-500 rounded-full text-xs font-semibold">Premium</span>
            </div>
          </div>
        </div>
        <HeroGlass data={demoData} />
      </section>

      {/* Footer avec instructions */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Comment choisir ?</h3>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-accent">Par cas d'usage</h4>
              <ul className="space-y-2 text-gray-300">
                <li>🏢 <strong>Corporate/B2B:</strong> Version Originale ou Minimal</li>
                <li>🎨 <strong>Moderne/Créatif:</strong> Version Modern ou Glass</li>
                <li>⚡ <strong>Performance prioritaire:</strong> Version Minimal</li>
                <li>✨ <strong>Wow effect:</strong> Version Glass</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-accent">Par caractéristiques</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📱 <strong>Mobile-first:</strong> Toutes versions (responsive)</li>
                <li>🚀 <strong>Rapide:</strong> Original ou Minimal</li>
                <li>🎭 <strong>Animations:</strong> Modern ou Glass</li>
                <li>💎 <strong>Premium:</strong> Minimal ou Glass</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h4 className="font-bold text-lg mb-2">📝 Prochaines étapes</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Choisissez votre version préférée ci-dessus</li>
              <li>Ouvrez <code className="bg-gray-700 px-2 py-1 rounded">components/adapters/DynamicComponent.tsx</code></li>
              <li>Modifiez l'import ligne 6 avec la version choisie</li>
              <li>Consultez <code className="bg-gray-700 px-2 py-1 rounded">QUICK_START.md</code> pour plus de détails</li>
            </ol>
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Toutes les versions utilisent le même mapping de données Strapi</p>
            <p className="mt-1">Changez de version sans modifier vos données ✨</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
