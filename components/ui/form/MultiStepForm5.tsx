"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const SERVICES = [
  { id: "fuite", label: "Fuite d'eau", price: "150-300 €", icon: "💧" },
  { id: "debouchage", label: "Débouchage", price: "100-220 €", icon: "🚽" },
  { id: "chauffe-eau", label: "Chauffe-eau", price: "150-350 €", icon: "🔥" },
  { id: "robinetterie", label: "Robinetterie", price: "80-180 €", icon: "🚰" },
  { id: "canalisation", label: "Canalisation", price: "150-250 €", icon: "🔧" },
  { id: "autre", label: "Autre", price: "Sur devis", icon: "🛠️" },
];

/**
 * Version 5: Style accordion/wizard compact
 */
export default function MultiStepForm5() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    urgency: "normal",
    address: "",
    phone: "",
  });

  const totalSteps = 3;

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.address.length >= 10;
  const canSubmit = formData.phone.length >= 10;

  const nextStep = () => {
    setCurrentStep((step) => {
      if (step === 1 && canProceedStep1) return 2;
      if (step === 2 && canProceedStep2) return 3;
      return step;
    });
  };

  const prevStep = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;

    if (currentStep === 1) {
      if (!canProceedStep1) return;
      e.preventDefault();
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!canProceedStep2) return;
      e.preventDefault();
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* Étape 1 */}
        <div className={`border-b-2 ${currentStep === 1 ? 'border-primary' : 'border-gray-200'}`}>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`w-full p-4 sm:p-6 flex items-center justify-between transition-colors ${
              currentStep === 1 ? 'bg-primary/5' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                formData.serviceType ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                {formData.serviceType ? '✓' : '1'}
              </div>
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg">Service</div>
                {formData.serviceType && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    {SERVICES.find(s => s.id === formData.serviceType)?.label}
                  </div>
                )}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${currentStep === 1 ? 'rotate-180' : ''}`} />
          </button>
          
          {currentStep === 1 && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: s.id })}
                    className={`p-2 sm:p-3 md:p-4 rounded-lg text-center transition-all ${
                      formData.serviceType === s.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl mb-0.5 sm:mb-1">{s.icon}</div>
                    <div className="font-semibold text-[10px] sm:text-xs">{s.label}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-1 sm:gap-2">
                {['normal', 'urgent', 'critique'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: u })}
                    className={`flex-1 py-1.5 sm:py-2 rounded font-medium text-[10px] sm:text-xs md:text-sm ${
                      formData.urgency === u ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>

              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedStep1}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Continuer
              </Button>
            </div>
          )}
        </div>

        {/* Étape 2 */}
        <div className={`border-b-2 ${currentStep === 2 ? 'border-primary' : 'border-gray-200'}`}>
          <button
            type="button"
            onClick={() => formData.serviceType && setCurrentStep(2)}
            disabled={!formData.serviceType}
            className={`w-full p-4 sm:p-6 flex items-center justify-between transition-colors ${
              currentStep === 2 ? 'bg-primary/5' : 'hover:bg-gray-50'
            } disabled:opacity-50`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                formData.address ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                {formData.address ? '✓' : '2'}
              </div>
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg">Adresse</div>
                {formData.address && <div className="text-xs sm:text-sm text-gray-600 truncate max-w-[150px] sm:max-w-xs">{formData.address}</div>}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${currentStep === 2 ? 'rotate-180' : ''}`} />
          </button>
          
          {currentStep === 2 && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border-2 rounded-lg focus:border-primary text-sm sm:text-base"
                  placeholder="Votre adresse"
                  autoFocus
                />
              </div>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedStep2}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Continuer
              </Button>
            </div>
          )}
        </div>

        {/* Étape 3 */}
        <div>
          <button
            type="button"
            onClick={() => formData.address && setCurrentStep(3)}
            disabled={!formData.address}
            className={`w-full p-4 sm:p-6 flex items-center justify-between transition-colors ${
              currentStep === 3 ? 'bg-primary/5' : 'hover:bg-gray-50'
            } disabled:opacity-50`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                formData.phone ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                {formData.phone ? '✓' : '3'}
              </div>
              <div className="text-left">
                <div className="font-bold text-base sm:text-lg">Contact</div>
                {formData.phone && <div className="text-xs sm:text-sm text-gray-600">{formData.phone}</div>}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${currentStep === 3 ? 'rotate-180' : ''}`} />
          </button>
          
          {currentStep === 3 && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border-2 rounded-lg focus:border-primary text-sm sm:text-base"
                  placeholder="06 12 34 56 78"
                  autoFocus
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold mb-2 text-sm sm:text-base">Récapitulatif</h4>
                <div className="text-xs sm:text-sm space-y-1 text-gray-700">
                  <div>{SERVICES.find(s => s.id === formData.serviceType)?.icon} {SERVICES.find(s => s.id === formData.serviceType)?.label}</div>
                  <div className="truncate">📍 {formData.address}</div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!canSubmit}
                variant="primary"
                size="lg"
                className="w-full"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Envoyer ma demande
              </Button>
            </div>
          )}
        </div>
      </form>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
}
