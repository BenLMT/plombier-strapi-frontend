"use client";

import { Clock, ShieldCheck, Star } from "lucide-react";

export default function CTASection() {
  const scrollToForm = () => {
    const form = document.getElementById("urgentForm");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      form.querySelector("input")?.focus();
    }
  };

  return (
    <section className="py-16 gradient-hero text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black mb-6">
          🚨 N'ATTENDEZ PLUS !<br />
          <span className="text-yellow-300">VOTRE PLOMBIER ARRIVE</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
          Chaque minute compte en cas de fuite ou panne. Mon équipe d'experts{" "}
          <strong>intervient immédiatement dans tout Paris</strong> avec la garantie satisfaction ou remboursé.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <a
            href="tel:0145789532"
            className="pulse-urgent bg-white text-red-600 px-12 py-6 rounded-2xl font-black text-2xl transition-all hover:scale-105 shadow-2xl"
          >
            🚨 APPEL D'URGENCE GRATUIT
          </a>
          <div className="text-xl text-blue-100">ou</div>
          <button
            onClick={scrollToForm}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 rounded-2xl font-black text-2xl transition-all hover:scale-105"
          >
            💬 FORMULAIRE EXPRESS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-6 h-6 text-yellow-300" />
            <span>
              <strong>Garantie</strong> 15 minutes
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-yellow-300" />
            <span>
              <strong>Devis</strong> 100% gratuit
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Star className="w-6 h-6 text-yellow-300" />
            <span>
              <strong>Note</strong> 4.9/5 Google
            </span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-10 transform -translate-x-24 translate-y-24"></div>
    </section>
  );
}
