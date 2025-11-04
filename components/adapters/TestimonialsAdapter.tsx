import type { TestimonialsSection } from "@/lib/strapi-types";
import Card from "@/components/ui/Card";
import { Star } from "lucide-react";

interface TestimonialsAdapterProps {
  data: TestimonialsSection;
}

/**
 * Adaptateur pour le Testimonials Section - Version dynamique
 */
export default function TestimonialsAdapter({ data }: TestimonialsAdapterProps) {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {data.title}
          </h2>
          
          {data.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {data.subtitle}
            </p>
          )}
          
          {/* Trustpilot Widget */}
          {data.showTrustpilot && (
            <div className="flex justify-center items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold bg-success text-white px-2 py-1 rounded">Excellent</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-success text-success" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-neutral-700">
                <strong>Trustpilot 4.6</strong> | <strong>8,521 avis</strong>
              </p>
            </div>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial) => (
            <Card key={testimonial.id} hover={false} className="flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-success text-success' : 'fill-neutral-300 text-neutral-300'}`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-2 mb-2">
                {testimonial.avatar?.url ? (
                  <img 
                    src={`${baseURL}${testimonial.avatar.url}`}
                    alt={testimonial.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                  <span className="text-neutral-500 text-xs">Vérifié</span>
                </div>
              </div>

              {/* Role/Location */}
              {testimonial.role && (
                <p className="text-xs text-neutral-600 mb-2">{testimonial.role}</p>
              )}

              {/* Content */}
              <p className="text-neutral-700 text-sm flex-grow mb-3">
                {testimonial.content}
              </p>

              {/* Date */}
              {testimonial.date && (
                <p className="text-neutral-500 text-xs">
                  {new Date(testimonial.date).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
