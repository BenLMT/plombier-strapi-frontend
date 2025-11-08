"use client";

import { Award, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Badge "Meilleure Enseigne 2025" */}
      <div className="absolute top-0 left-0 right-0 bg-neutral-50 py-2 text-center z-20 border-b border-neutral-200">
        <p className="text-xs md:text-sm text-neutral-700">
          <Award className="inline-block w-4 h-4 mr-1 text-accent" />
          <strong>Primée "Meilleure Enseigne 2025"*</strong> par Capital pour l'excellence de notre service
        </p>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[600px] pt-12">
        {/* Left Content - Fond Bleu Marine */}
        <div className="bg-primary text-white px-6 md:px-12 py-16 md:py-20 flex items-center relative">
          <div className="max-w-xl w-full">
            {/* Titre principal */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-10">
              Plombier Paris : votre dépannage d'urgence, 24h/24 et 7j/7
            </h1>

            {/* 3 Bullet Points - Design épuré */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Experts certifiés</p>
                  <p className="text-sm text-white/70">Professionnels diplômés et couverts par assurance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Sans frais supplémentaires le soir/weekend</p>
                  <p className="text-sm text-white/70">Prix fixes toute la semaine</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Assistance 24/7</p>
                  <p className="text-sm text-white/70">Arrivée en express</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <Button variant="primary" size="lg" className="text-base md:text-lg font-bold shadow-2xl group hover:scale-105 transition-transform w-full sm:w-auto">
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Je décris mon besoin
              </Button>
            </div>

            {/* Trustpilot Badge - Design moderne */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-5 py-3 border border-white/10">
              <p className="text-xs font-bold bg-success text-white px-3 py-1 rounded-full">
                Bien
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-success text-base">★</span>
                ))}
              </div>
              <p className="text-sm text-white/90">
                <strong>8,521 avis</strong>
              </p>
            </div>
          </div>

          {/* Wave Shape on the right side */}
          <div className="absolute right-0 top-0 bottom-0 w-16 overflow-hidden hidden lg:block">
            <svg className="absolute right-0 h-full w-32" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d="M0,0 Q50,400 0,800 L0,800 L0,0 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative bg-neutral-100 flex items-center justify-center overflow-hidden">
          <Image
            src="/plombier-famille.png"
            alt="Plombier professionnel accueilli par une famille parisienne souriante"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            quality={85}
          />
          
          {/* Badge "Nouveau site" en bas à droite */}
          <div className="absolute bottom-8 right-8 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-10">
            <p className="text-xs font-bold">Nouveau site</p>
            <p className="text-xs">Le même mais en mieux</p>
          </div>
        </div>
      </div>

      {/* Logos partenaires en bas */}
      <div className="bg-white py-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-neutral-500 text-center mb-4">Une exigence reconnue, une confiance qui dure</p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-neutral-700 font-bold text-sm">MAE</div>
            <div className="text-neutral-700 font-bold text-sm">ARISTON</div>
            <div className="text-neutral-700 font-bold text-sm">BHV</div>
            <div className="text-neutral-700 font-bold text-sm">trane</div>
          </div>
        </div>
      </div>
    </section>
  );
}
