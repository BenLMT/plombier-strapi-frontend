import { Store, Award, FileCheck } from "lucide-react";

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Pourquoi Choisir la Plomberie Daniel ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contrairement aux plateformes anonymes, nous sommes des artisans avec pignon sur rue, engagés pour votre satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 p-8 rounded-xl shadow-md service-card">
            <Store className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pignon sur Rue depuis 1980</h3>
            <p className="text-gray-600">
              Notre magasin au <strong>99 rue Saint-Maur 75011</strong> est votre garantie de notre sérieux et de notre pérennité. Venez nous rencontrer !
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-md service-card">
            <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Artisans de Père en Fils</h3>
            <p className="text-gray-600">
              Un savoir-faire transmis sur plusieurs générations pour un travail honnête, soigné et des tarifs justes. Votre confiance est notre priorité.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-md service-card">
            <FileCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Agréé Assurances</h3>
            <p className="text-gray-600">
              Nous sommes agréés par les assurances pour les recherches de fuite et la remise en état après un dégât des eaux. Nous vous aidons dans vos démarches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
