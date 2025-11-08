"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const SERVICES = [
  { id: "fuite", label: "Fuite d'eau", price: "150-300 €", icon: "💧", description: "Réparation de fuite" },
  { id: "debouchage", label: "Débouchage", price: "100-220 €", icon: "🚽", description: "WC, évier, lavabo" },
  { id: "chauffe-eau", label: "Chauffe-eau", price: "150-350 €", icon: "🔥", description: "Réparation ou remplacement" },
  { id: "robinetterie", label: "Robinetterie", price: "80-180 €", icon: "🚰", description: "Installation ou réparation" },
  { id: "canalisation", label: "Canalisation", price: "150-250 €", icon: "🔧", description: "Réparation de tuyauterie" },
  { id: "autre", label: "Autre intervention", price: "Sur devis", icon: "🛠️", description: "Décrivez votre besoin" },
];

const STEPS = [
  { num: 1, label: 'Service' },
  { num: 2, label: 'Urgence' },
  { num: 3, label: 'Adresse' },
  { num: 4, label: 'Contact' }
];

/**
 * Version 2: Style avec steps numérotés en ligne et animations slide
 */
export default function MultiStepForm2() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    urgency: "",
    address: "",
    phone: "",
  });

  const totalSteps = 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.urgency !== "";
  const canProceedStep3 = formData.address.length >= 10;
  const canSubmit = formData.phone.length >= 10;

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    if (currentStep >= totalSteps) return;

    e.preventDefault();

    if (currentStep === 1 && canProceedStep1) {
      nextStep();
      return;
    }

    if (currentStep === 2 && canProceedStep2) {
      nextStep();
      return;
    }

    if (currentStep === 3 && canProceedStep3) {
      nextStep();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl p-2 sm:p-8 mx-auto lg:mx-0 lg:ml-auto lg:mr-0 lg:justify-self-end lg:self-start">
      {/* Steps numérotés en ligne */}
      <div className="flex items-center mb-8">
        {STEPS.map((step, idx) => (
          <>
            <div className="flex flex-col items-center text-center px-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                currentStep >= step.num
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > step.num ? '✓' : step.num}
              </div>
              <div className={`text-xs font-semibold mt-2 transition-colors ${
                currentStep >= step.num ? 'text-primary' : 'text-gray-400'
              }`}>
                {step.label}
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 transition-colors ${
                currentStep > step.num ? 'bg-primary' : 'bg-gray-200'
              }`} />
            )}
          </>
        ))}
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* ÉTAPE 1 */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Quel est votre besoin ?
              </h3>
              <p className="text-gray-600">Sélectionnez le type d'intervention</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: service.id })}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === service.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{service.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-0.5">
                    {service.label}
                  </div>
                  <div className="text-[11px] text-gray-600 mb-1">{service.description}</div>
                  <div className="text-accent font-bold text-xs">{service.price}</div>
                </button>
              ))}
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
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Quel niveau d'urgence ?
              </h3>
              <p className="text-gray-600">Précisez le délai souhaité</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'normal', label: '📅 Normal', desc: '24-48h' },
                { value: 'urgent', label: '⚡ Urgent', desc: "Aujourd'hui" },
                { value: 'critique', label: '🚨 Critique', desc: 'Immédiat' }
              ].map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level.value })}
                  className={`py-4 px-3 rounded-xl border-2 font-semibold transition-all text-center ${
                    formData.urgency === level.value
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/40'
                  }`}
                >
                  <div className="text-sm mb-1">{level.label}</div>
                  <div className="text-xs opacity-80">{level.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
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

        {/* ÉTAPE 3 */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Où se situe l'intervention ?
              </h3>
              <p className="text-gray-600">Indiquez votre adresse complète</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="12 rue de l'exemple, 75001 Paris"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedStep3}
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

        {/* ÉTAPE 4 */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Comment vous joindre ?
              </h3>
              <p className="text-gray-600">Dernière étape pour votre devis</p>
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
                  className="w-full pl-11 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                  placeholder="06 12 34 56 78"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Nous vous appellerons sous 2h pour confirmer le rendez-vous
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 space-y-2 border border-primary/20">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Récapitulatif
              </h4>
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
                <ArrowLeft className="w-5 h-5 mr-2" />
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
                Envoyer
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              En soumettant ce formulaire, vous acceptez d'être recontacté par nos services.
            </p>
          </div>
        )}
        <SuccessModal 
            isOpen={showSuccessModal} 
            onClose={() => setShowSuccessModal(false)} 
        />
      </form>
    </div>
  );
}
