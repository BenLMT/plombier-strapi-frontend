"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ChevronRight, Clock, Zap } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const SERVICES = [
  { id: "fuite", label: "Fuite d'eau", price: "150-300 €", icon: "💧", description: "Réparation de fuite" },
  { id: "debouchage", label: "Débouchage", price: "100-220 €", icon: "🚽", description: "WC, évier, lavabo" },
  { id: "chauffe-eau", label: "Chauffe-eau", price: "150-350 €", icon: "🔥", description: "Réparation ou remplacement" },
  { id: "robinetterie", label: "Robinetterie", price: "80-180 €", icon: "🚰", description: "Installation ou réparation" },
  { id: "canalisation", label: "Canalisation", price: "150-250 €", icon: "🔧", description: "Réparation de tuyauterie" },
  { id: "autre", label: "Autre intervention", price: "Sur devis", icon: "🛠️", description: "Décrivez votre besoin" },
];

/**
 * Version 1: Style avec cartes en liste verticale et navigation latérale
 */
export default function MultiStepForm1() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    urgency: "normal",
    address: "",
    phone: "",
  });

  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
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

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || currentStep >= totalSteps) return;

    e.preventDefault();
    if (currentStep === 1 && canProceedStep1) {
      nextStep();
    }
    if (currentStep === 2 && canProceedStep2) {
      nextStep();
    }
  };

  const steps = [
    { number: 1, title: "Service", icon: "🔧" },
    { number: 2, title: "Adresse", icon: "📍" },
    { number: 3, title: "Contact", icon: "📞" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
      {/* Tabs horizontaux en haut */}
      <div className="flex justify-between mb-8 border-b-2 border-gray-100">
        {steps.map((step) => (
          <button
            key={step.number}
            type="button"
            onClick={() => {
              if (step.number === 1) setCurrentStep(1);
              else if (step.number === 2 && formData.serviceType) setCurrentStep(2);
              else if (step.number === 3 && formData.address.length >= 10) setCurrentStep(3);
            }}
            disabled={
              (step.number === 2 && !formData.serviceType) ||
              (step.number === 3 && formData.address.length < 10)
            }
            className={`flex-1 pb-4 px-2 sm:px-4 transition-all disabled:cursor-not-allowed ${
              currentStep === step.number
                ? 'border-b-4 border-primary'
                : currentStep > step.number
                ? 'border-b-4 border-accent'
                : 'border-b-4 border-transparent opacity-50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`text-2xl sm:text-3xl transition-transform ${currentStep === step.number ? 'scale-125' : ''}`}>
                {currentStep > step.number ? '✓' : step.icon}
              </div>
              <div className={`font-bold text-xs sm:text-sm ${currentStep === step.number ? 'text-primary' : 'text-gray-600'}`}>
                {step.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
            {/* ÉTAPE 1 */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  Quel est votre besoin ?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceType: service.id })}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                        formData.serviceType === service.id
                          ? 'border-primary bg-primary/10 shadow-lg'
                          : 'border-gray-200 hover:border-primary/50 bg-white'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl mb-2">{service.icon}</div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {service.label}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{service.description}</div>
                      <div className="text-accent font-bold text-sm">{service.price}</div>
                    </button>
                  ))}
                </div>

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
                        className={`py-3 px-2 rounded-lg font-semibold transition-all text-center text-xs sm:text-sm ${
                          formData.urgency === level.value
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="sm:hidden">{level.label.split(' ')[0]}</div>
                        <div className="hidden sm:block">{level.label}</div>
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

            {/* ÉTAPE 2 */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
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
                      className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base sm:text-lg"
                      placeholder="12 rue de la Paix, 75001 Paris"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Indiquez votre adresse complète pour une intervention rapide
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedStep2}
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
                  >
                    Continuer
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
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
                      className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base sm:text-lg"
                      placeholder="06 12 34 56 78"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Nous vous appellerons sous 2h pour confirmer le rendez-vous
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 space-y-2">
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
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

          <SuccessModal 
            isOpen={showSuccessModal} 
            onClose={() => setShowSuccessModal(false)} 
          />
    </div>
  );
}
