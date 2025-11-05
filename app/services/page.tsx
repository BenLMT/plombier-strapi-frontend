import { fetchContentType } from "@/lib/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceAdapter from "@/components/adapters/ServiceAdapter";
import { Wrench, Phone } from "lucide-react";
import Link from "next/link";

export default async function ServicesPage() {
  let services = [];

  try {
    const response = await fetchContentType("services", {
      populate: "*",
      sort: ["ordre:asc", "nom:asc"],
    });
    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Simple */}
      <section className="bg-gradient-to-br from-primary to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Wrench className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Des solutions professionnelles pour tous vos besoins en plomberie
          </p>
          <a
            href="tel:0974735472"
            className="inline-flex items-center px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition shadow-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            09 74 73 54 72
          </a>
        </div>
      </section>

      {/* Liste Simple de Tous les Services */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceAdapter key={service.id} service={service} variant="card" />
            ))}
          </div>
        ) : (
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
        )}

        {/* CTA Bas de Page */}
        {services.length > 0 && (
          <div className="mt-16 bg-gradient-to-br from-secondary to-secondary-800 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Une question sur nos services ?
            </h2>
            <p className="text-white/90 mb-6">
              Notre équipe est à votre disposition pour vous conseiller
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0974735472"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur text-white font-bold rounded-xl hover:bg-white/20 transition border-2 border-white/30"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
