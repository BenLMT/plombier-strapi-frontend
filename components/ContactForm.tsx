"use client";

import { useState } from "react";
import { Zap, Users, Lock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    problem: "",
    prenom: "",
    telephone: "",
    arrondissement: "75011",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Demande envoyée ! Nous vous rappelons sous 60 secondes.");
        setFormData({
          problem: "",
          prenom: "",
          telephone: "",
          arrondissement: "75011",
          description: "",
        });
      } else {
        setMessage("❌ Erreur. Appelez directement le 01.43.38.03.23");
      }
    } catch (error) {
      setMessage("❌ Erreur. Appelez directement le 01.43.38.03.23");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 relative" id="urgentForm">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
        RÉPONSE SOUS 60 SECONDES
      </div>

      <div className="text-center mb-4 mt-2">
        <h2 className="text-xl font-black text-gray-900 mb-1 flex items-center justify-center">
          <Zap className="w-5 h-5 mr-1 text-orange-500" />
          Intervention Immédiate
        </h2>
        <p className="text-gray-600 font-medium text-sm">
          Dites-moi tout, j'arrive dans 15 minutes !
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-3">
          <div className="text-green-700 text-xs font-bold flex items-center justify-center">
            <Users className="w-3 h-3 mr-1" />
            8 techniciens disponibles maintenant dans Paris
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Problem Type Selection */}
        <div>
          <label className="block text-xs font-black text-gray-700 mb-2">
            🚨 Quel est votre problème urgent ?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "fuite", emoji: "💧", label: "FUITE D'EAU", urgency: "URGENCE MAX", color: "red" },
              { value: "bouchon", emoji: "🚽", label: "WC BOUCHÉ", urgency: "INTERVENTION RAPIDE", color: "orange" },
              { value: "chaudiere", emoji: "🔥", label: "CHAUDIÈRE", urgency: "EXPERT CERTIFIÉ", color: "blue" },
              { value: "autre", emoji: "🔧", label: "AUTRE", urgency: "DÉPANNAGE", color: "purple" },
            ].map((item) => (
              <label key={item.value} className="problem-choice cursor-pointer">
                <input
                  type="radio"
                  name="problem"
                  value={item.value}
                  checked={formData.problem === item.value}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="sr-only"
                  required
                />
                <div className="choice-card border-2 border-gray-200 rounded-lg p-3 text-center hover:border-blue-300 transition-all">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="font-bold text-gray-900 text-xs">{item.label}</div>
                  <div className={`text-xs text-${item.color}-600 font-bold`}>{item.urgency}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Prénom *</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-sm"
              placeholder="Jean"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Téléphone *</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-sm"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">📍 Votre arrondissement *</label>
          <select
            name="arrondissement"
            value={formData.arrondissement}
            onChange={(e) => setFormData({ ...formData, arrondissement: e.target.value })}
            required
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-sm"
          >
            <option value="">Sélectionnez votre secteur</option>
            <option value="75011">11e - Popincourt (Notre secteur)</option>
            <optgroup label="Arrondissements limitrophes">
              <option value="75003">3e - Temple</option>
              <option value="75004">4e - Hôtel de Ville</option>
              <option value="75010">10e - République</option>
              <option value="75012">12e - Reuilly</option>
              <option value="75019">19e - Buttes Chaumont</option>
              <option value="75020">20e - Ménilmontant</option>
            </optgroup>
            <optgroup label="Autres arrondissements">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={`750${num.toString().padStart(2, "0")}`}>
                  {num}e arrondissement
                </option>
              ))}
            </optgroup>
            <optgroup label="Proche Banlieue">
              <option value="92">Hauts-de-Seine (92)</option>
              <option value="93">Seine-Saint-Denis (93)</option>
              <option value="94">Val-de-Marne (94)</option>
            </optgroup>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Description rapide (optionnel)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-sm"
            placeholder="Décrivez votre problème en quelques mots pour une intervention plus efficace..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-black text-base transition-all disabled:opacity-50"
        >
          {isSubmitting ? "⏳ ENVOI EN COURS..." : "🚀 J'ENVOIE MA DEMANDE D'INTERVENTION"}
        </button>

        {/* Message */}
        {message && (
          <div className={`text-sm text-center font-bold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center flex items-center justify-center">
          <Lock className="w-3 h-3 mr-1" />
          Vos données sont protégées • Réponse garantie sous 60 secondes
        </p>
      </form>
    </div>
  );
}
