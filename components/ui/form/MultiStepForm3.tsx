"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ChevronRight, Package } from "lucide-react";
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
 * Version 3: Style clean et moderne avec sidebar de progression
 */
export default function MultiStepForm3() {
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

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.address.length >= 10;

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || currentStep >= totalSteps) return;

    e.preventDefault();
    if (currentStep === 1 && canProceedStep1) {
      nextStep();
      return;
    }

    if (currentStep === 2 && canProceedStep2) {
      nextStep();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden md:flex">
      {/* Sidebar de progression */}
      <div className="hidden md:flex w-20 bg-gray-50 flex-col items-center py-8 gap-6">
        {[1, 2, 3].map((step) => (
          <div key={step} className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
              currentStep === step 
                ? 'bg-primary text-white shadow-lg scale-110' 
                : currentStep > step
                ? 'bg-accent text-white'
                : 'bg-white text-gray-400 border-2 border-gray-200'
            }`}>
              {currentStep > step ? '✓' : step}
            </div>
            {step < 3 && (
              <div className={`absolute left-1/2 -translate-x-1/2 top-12 w-0.5 h-6 ${
                currentStep > step ? 'bg-accent' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="mb-6">
                <div className="text-sm font-semibold text-primary mb-1">ÉTAPE 1/3</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Quel est votre besoin ?</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: service.id })}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                      formData.serviceType === service.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/30 bg-white hover:shadow-sm'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{service.icon}</div>
                    <div className="font-semibold text-xs sm:text-sm">{service.label}</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{service.description}</div>
                    <div className="text-accent font-bold text-xs sm:text-sm">{service.price}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Niveau d'urgence
                </label>
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  {[
                    { value: 'normal', label: '📅 Normal', desc: '24-48h' },
                    { value: 'urgent', label: '⚡ Urgent', desc: 'Auj.' },
                    { value: 'critique', label: '🚨 Critique', desc: 'Immédiat' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: level.value })}
                      className={`py-2 sm:py-3 px-1 sm:px-2 rounded-lg font-semibold transition-all text-[10px] sm:text-xs md:text-sm ${
                        formData.urgency === level.value
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-[10px] sm:text-xs">{level.label}</div>
                      <div className="text-[9px] sm:text-xs opacity-75">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="button" onClick={nextStep} disabled={!canProceedStep1} variant="primary" size="lg" className="w-full">
                Continuer <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="mb-6">
                <div className="text-sm font-semibold text-primary mb-1">ÉTAPE 2/3</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Où se situe l'intervention ?</h3>
              </div>
              
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
                    className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 text-base sm:text-lg"
                    placeholder="12 rue de la Paix, 75001 Paris"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Indiquez votre adresse complète pour une intervention rapide
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" onClick={prevStep} variant="secondary" size="lg" className="w-full sm:flex-1">Retour</Button>
                <Button type="button" onClick={nextStep} disabled={formData.address.length < 10} variant="primary" size="lg" className="w-full sm:flex-1">
                  Continuer <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="mb-6">
                <div className="text-sm font-semibold text-primary mb-1">ÉTAPE 3/3</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Comment vous joindre ?</h3>
              </div>
              
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
                    className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 text-base sm:text-lg"
                    placeholder="06 12 34 56 78"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Nous vous appellerons sous 2h
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Récapitulatif de votre demande
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{SERVICES.find(s => s.id === formData.serviceType)?.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{SERVICES.find(s => s.id === formData.serviceType)?.label}</div>
                      <div className="text-gray-600">{SERVICES.find(s => s.id === formData.serviceType)?.price}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{formData.address}</span>
                  </div>
                  <div className="text-gray-700">
                    {formData.urgency === 'normal' && '⏱️ Intervention sous 24-48h'}
                    {formData.urgency === 'urgent' && '⚡ Intervention aujourd\'hui'}
                    {formData.urgency === 'critique' && '🚨 Intervention immédiate'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" onClick={prevStep} variant="secondary" size="lg" className="w-full sm:flex-1">Retour</Button>
                <Button type="submit" disabled={formData.phone.length < 10} variant="primary" size="lg" className="w-full sm:flex-1">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Envoyer ma demande
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être recontacté par nos services.
              </p>
            </div>
          )}
        </form>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
}
