import { fetchContentType } from "@/lib/strapi";
import ServiceAdapter from "@/components/adapters/ServiceAdapter";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

interface ServicesSectionDynamicProps {
  title?: string;
  subtitle?: string;
  maxServices?: number;
  showPopularOnly?: boolean;
  showUrgentOnly?: boolean;
  category?: string;
  variant?: "card" | "list" | "featured";
  showViewAllButton?: boolean;
}

/**
 * Section Services Dynamique - Charge les services depuis Strapi
 * Réutilise les couleurs primary, secondary, accent
 */
export default async function ServicesSectionDynamic({
  title = "Nos Services de Plomberie",
  subtitle = "Des artisans qualifiés pour tous vos besoins en plomberie",
  maxServices = 6,
  showPopularOnly = false,
  showUrgentOnly = false,
  category,
  variant = "card",
  showViewAllButton = true,
}: ServicesSectionDynamicProps) {
  let services = [];

  try {
    // Construire les filtres
    const filters: any = {};
    
    if (showPopularOnly) {
      filters.populaire = true;
    }
    
    if (showUrgentOnly) {
      filters.urgence = true;
    }
    
    if (category) {
      filters.category = { $eq: category };
    }

    const response = await fetchContentType("services", {
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      populate: "*",
      sort: ["ordre:asc", "nom:asc"],
      pagination: {
        limit: maxServices,
      },
    });

    services = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  // Si aucun service, ne rien afficher
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
            <Wrench className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 ${
          variant === "list" 
            ? "gap-4" 
            : variant === "featured"
            ? "md:grid-cols-2 gap-8"
            : "md:grid-cols-2 lg:grid-cols-3 gap-6"
        }`}>
          {services.map((service: any) => (
            <ServiceAdapter 
              key={service.id} 
              service={service} 
              variant={variant}
            />
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 group"
            >
              <span>Voir tous nos services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
