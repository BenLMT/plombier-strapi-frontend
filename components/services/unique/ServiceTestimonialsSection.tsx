import { Star } from "lucide-react";

interface ServiceTestimonialsSectionProps {
  testimonials: any[];
}

const ServiceTestimonialsSection = ({ testimonials }: ServiceTestimonialsSectionProps) => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Ils nous font confiance
        </h2>
        <p className="text-lg text-gray-600">
          Des clients satisfaits partagent leur expérience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((temoignage: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 text-accent">
              <Star className="w-5 h-5 fill-current" />
              {temoignage.rating && (
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: Math.min(5, Math.round(temoignage.rating)) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              )}
            </div>
            {temoignage.text && (
              <p className="text-gray-700 leading-relaxed">
                “{temoignage.text}”
              </p>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                {temoignage.name && (
                  <p className="text-lg font-semibold text-gray-900">{temoignage.name}</p>
                )}
                {temoignage.role && (
                  <p className="text-sm text-gray-500">{temoignage.role}</p>
                )}
                {temoignage.location && (
                  <p className="text-sm text-gray-400">{temoignage.location}</p>
                )}
              </div>
              {temoignage.date && (
                <span className="text-xs text-gray-400">
                  {new Date(temoignage.date).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceTestimonialsSection;
