import { Droplets, ShowerHead, Trash2, Bath, Plug, Brush, LayoutGrid, HardHat, Square, Box } from "lucide-react";
import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Nos Services de Plomberie et Rénovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De l'urgence à la rénovation complète, la Plomberie Daniel est votre unique interlocuteur pour des travaux de qualité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-50 rounded-lg p-4 text-center border-t-4 border-blue-500 shadow-md service-card">
            <Droplets className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Dépannage Urgent</h3>
            <p className="text-sm text-gray-600">
              Fuite d'eau, canalisation bouchée, panne de chauffe-eau. Intervention rapide et efficace.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center border-t-4 border-blue-500 shadow-md service-card">
            <ShowerHead className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Ballon d'Eau Chaude</h3>
            <p className="text-sm text-gray-600">
              Remplacement, installation et réparation. Modèles standards et design (Velis Evo).
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center border-t-4 border-blue-500 shadow-md service-card">
            <Trash2 className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Sanibroyeur & WC</h3>
            <p className="text-sm text-gray-600">
              Installation et dépannage de Sanibroyeur SFA, WC suspendus et traditionnels.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center border-t-4 border-blue-500 shadow-md service-card">
            <Bath className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Création Salle de Bain</h3>
            <p className="text-sm text-gray-600">
              Rénovation complète ou création de votre salle de bain de A à Z.
            </p>
          </div>
        </div>

        {/* All Trades Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Une Entreprise Tout Corps d'État
              </h3>
              <p className="text-gray-700 mb-6">
                Plus besoin de jongler entre les artisans ! La Plomberie Daniel est votre unique interlocuteur pour tous vos travaux de rénovation. Nous coordonnons pour vous :
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-800">
                <div className="flex items-center space-x-2">
                  <Plug className="w-5 h-5 text-blue-600" />
                  <span>Électricité</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brush className="w-5 h-5 text-blue-600" />
                  <span>Peinture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LayoutGrid className="w-5 h-5 text-blue-600" />
                  <span>Carrelage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardHat className="w-5 h-5 text-blue-600" />
                  <span>Maçonnerie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-5 h-5 text-blue-600" />
                  <span>Fenêtres PVC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Box className="w-5 h-5 text-blue-600" />
                  <span>Menuiserie</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Image
                src="https://replicate.delivery/xezq/J1hK9vaeTqyzYit9fbo3RPe0xwcigtTrO5HoVaTB0VGl2RsqA/tmpzgd1ac0b.jpg"
                alt="Équipe de rénovation"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
