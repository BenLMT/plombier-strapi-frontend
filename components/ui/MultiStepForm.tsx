"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ChevronRight } from "lucide-react";

// Services avec prix estimés
const SERVICES = [
  { id: "fuite", label: "Fuite d'eau", price: "150-300 €", icon: "💧", description: "Réparation de fuite" },
  { id: "debouchage", label: "Débouchage", price: "100-220 €", icon: "🚽", description: "WC, évier, lavabo" },
  { id: "chauffe-eau", label: "Chauffe-eau", price: "150-350 €", icon: "🔥", description: "Réparation ou remplacement" },
  { id: "robinetterie", label: "Robinetterie", price: "80-180 €", icon: "🚰", description: "Installation ou réparation" },
  { id: "canalisation", label: "Canalisation", price: "150-250 €", icon: "🔧", description: "Réparation de tuyauterie" },
  { id: "autre", label: "Autre intervention", price: "Sur devis", icon: "🛠️", description: "Décrivez votre besoin" },
];

/**
 * Composant Client isolé pour le formulaire multi-steps
 * Île d'interactivité minimale
 */
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    urgency: "normal",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Envoyer à Strapi ou API
    alert("Devis envoyé ! Nous vous recontactons sous 2h.");
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.address.length >= 10;
  const canSubmit = formData.phone.length >= 10;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                currentStep >= step 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                  currentStep > step ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 px-1">
          <span>Service</span>
          <span>Adresse</span>
          <span>Contact</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ÉTAPE 1 : Type de service + Urgence */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
              Quel est votre besoin ?
            </h3>
            
            {/* Services avec prix */}
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: service.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === service.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {service.label}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{service.description}</div>
                  <div className="text-accent font-bold text-sm">{service.price}</div>
                </button>
              ))}
            </div>

            {/* Urgence */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Niveau d'urgence
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'normal', label: '📅 Normal', desc: '24-48h' },
                  { value: 'urgent', label: '⚡ Urgent', desc: 'Aujourd\'hui' },
                  { value: 'critique', label: '🚨 Critique', desc: 'Immédiat' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: level.value })}
                    className={`py-3 px-2 rounded-lg font-semibold transition-all text-center ${
                      formData.urgency === level.value
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-sm">{level.label}</div>
                    <div className="text-xs opacity-75 mt-1">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceedStep1}
              variant="primary"
              size="lg"
              className="w-full text-lg font-bold"
            >
              Continuer
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* ÉTAPE 2 : Adresse */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
              Où se situe l'intervention ?
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse complète *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="12 rue de la Paix, 75001 Paris"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Indiquez votre adresse complète pour une intervention rapide
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                Retour
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedStep2}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Continuer
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Téléphone + Validation */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
              Comment vous joindre ?
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="06 12 34 56 78"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Nous vous appellerons sous 2h pour confirmer le rendez-vous
              </p>
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-gray-900 mb-3">Récapitulatif</h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">{SERVICES.find(s => s.id === formData.serviceType)?.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">
                    {SERVICES.find(s => s.id === formData.serviceType)?.label}
                  </div>
                  <div className="text-gray-600">
                    {SERVICES.find(s => s.id === formData.serviceType)?.price}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-700">{formData.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">
                  {formData.urgency === 'normal' && 'Intervention sous 24-48h'}
                  {formData.urgency === 'urgent' && 'Intervention aujourd\'hui'}
                  {formData.urgency === 'critique' && 'Intervention immédiate'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                Retour
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Envoyer ma demande
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              En soumettant ce formulaire, vous acceptez d'être recontacté par nos services.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
