import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import { MapPin, Phone, Mail, ExternalLink, Users } from "lucide-react";

export const metadata = {
  title: "Annuaire des Plombiers à Paris | Plomberie Daniel",
  description: "Trouvez un plombier qualifié près de chez vous. Annuaire des professionnels de la plomberie à Paris.",
};

export default async function AnnuairePage() {
  let professionals = [];
  
  try {
    const response = await fetchContentType("professionals", {
      populate: "*",
      sort: "name:asc",
    });
    professionals = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des professionnels:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Annuaire des Professionnels</h1>
          <p className="text-xl text-green-100">
            Trouvez un plombier qualifié près de chez vous
          </p>
        </div>
      </div>

      {/* Professionnels */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {professionals.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Annuaire en construction
              </h2>
              <p className="text-gray-600 mb-6">
                Nous ajoutons régulièrement de nouveaux professionnels qualifiés.
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((pro: any) => (
              <div
                key={pro.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {pro.photo?.url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${pro.photo.url}`}
                      alt={pro.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {pro.name}
                  </h2>
                  {pro.company && (
                    <p className="text-sm text-gray-600 mb-2">{pro.company}</p>
                  )}
                  {pro.specialty && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-4">
                      {pro.specialty}
                    </span>
                  )}
                  
                  {pro.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {pro.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    {pro.city && pro.postalCode && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{pro.city} ({pro.postalCode})</span>
                      </div>
                    )}
                    {pro.phone && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a href={`tel:${pro.phone}`} className="hover:text-green-600 transition">
                          {pro.phone}
                        </a>
                      </div>
                    )}
                    {pro.email && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <a href={`mailto:${pro.email}`} className="hover:text-green-600 transition truncate">
                          {pro.email}
                        </a>
                      </div>
                    )}
                    {pro.website && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        <a 
                          href={pro.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-green-600 transition truncate"
                        >
                          Site web
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BlogFooter />
    </div>
  );
}
