"use client";

import Card from "../ui/Card";
import { Star } from "lucide-react";

export default function TestimonialsModernSection() {
  const testimonials = [
    {
      author: "HUMMEL",
      rating: 5,
      title: "efficace rapide travail bien fait",
      text: "efficace rapide travail bien fait",
      time: "il y a 4 heures",
    },
    {
      author: "cliente",
      rating: 5,
      title: "Réactivité parfaite",
      text: "Réactivité parfaite, travail **impeccable**. Par contre, montant payé un peu plus cher que **l'estimation initiale, mais le travail est soigné.**",
      time: "il y a 10 heures",
    },
    {
      author: "client",
      rating: 5,
      title: "Panne réglée très rapidement",
      text: "Panne réglée très rapidement",
      time: "il y a 16 heures",
    },
    {
      author: "client",
      rating: 4,
      title: "Je recommande pour une int...",
      text: "Mon ballon d'eau chaude s'est subitement mis à fuir et j'ai été pris en relation **très vite avec un technicien. Intervention efficace.**",
      time: "il y a 1 jour",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nos clients parisiens nous recommandent
          </h2>
          
          {/* Trustpilot Widget Placeholder */}
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} hover={false} className="flex flex-col">
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
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {testimonial.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">{testimonial.author}</p>
                  <span className="text-neutral-500 text-xs">Vérifié</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-bold text-primary text-sm mb-2">
                {testimonial.title}
              </h4>

              {/* Text */}
              <p className="text-neutral-700 text-sm flex-grow mb-3">
                {testimonial.text}
              </p>

              {/* Time */}
              <p className="text-neutral-500 text-xs">{testimonial.time}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
