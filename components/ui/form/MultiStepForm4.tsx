"use client";

import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";
import { Phone, MapPin, CheckCircle2, ArrowLeft, ChevronRight, Clock } from "lucide-react";
import SuccessModal from "@/components/ui/SuccessModal";

const SERVICES = [
  { id: "fuite", label: "Fuite d'eau", price: "150-300 €", icon: "💧" },
  { id: "debouchage", label: "Débouchage", price: "100-220 €", icon: "🚽" },
  { id: "chauffe-eau", label: "Chauffe-eau", price: "150-350 €", icon: "🔥" },
  { id: "robinetterie", label: "Robinetterie", price: "80-180 €", icon: "🚰" },
  { id: "canalisation", label: "Canalisation", price: "150-250 €", icon: "🔧" },
  { id: "autre", label: "Autre intervention", price: "Sur devis", icon: "🛠️" },
];

const URGENCY_LEVELS = [
    { value: "normal", label: "📅 Normal", desc: "Intervention sous 24-48h" },
    { value: "urgent", label: "⚡ Urgent", desc: "Intervention aujourd'hui" },
    { value: "critique", label: "🚨 Critique", desc: "Intervention immédiate" },
];


/**
 * Version 4: Style minimal et épuré
 */
export default function MultiStepForm4() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    urgency: "normal",
    address: "",
    phone: "",
  });

  const totalSteps = 4;

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, totalSteps));
  const prevStep = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.urgency !== "";
  const canProceedStep3 = formData.address.length >= 10;
  const canSubmit = formData.phone.length >= 10;

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || currentStep >= totalSteps) return;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccessModal(true);
  };

  return (
    <div className="w-full max-w-full bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
      {/* Steps minimales */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all ${
              currentStep >= num ? 'bg-primary text-white scale-110' : 'bg-gray-100 text-gray-400'
            }`}>
              {currentStep > num ? '✓' : num}
            </div>
            {num < 4 && <div className={`w-8 sm:w-12 md:w-16 h-0.5 ${currentStep > num ? 'bg-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="min-h-[450px]">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Votre besoin</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: s.id })}
                  className={`p-3 sm:p-4 md:p-6 rounded-xl transition-all ${
                    formData.serviceType === s.id
                      ? 'bg-primary text-white shadow-xl scale-105'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{s.icon}</div>
                  <div className="font-semibold text-[10px] sm:text-xs md:text-sm">{s.label}</div>
                </button>
              ))}
            </div>

            <Button type="button" onClick={nextStep} disabled={!canProceedStep1} variant="primary" size="lg" className="w-full !mt-12">
              Suivant <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 2: Urgency */}
        {currentStep === 2 && (
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Quel niveau d'urgence ?</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center pt-4 sm:pt-8">
              {URGENCY_LEVELS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: u.value })}
                  className={`px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl font-medium transition-all w-28 sm:w-32 md:w-40 text-center ${
                    formData.urgency === u.value ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-xs sm:text-sm md:text-lg">{u.label}</div>
                  <div className="text-[10px] sm:text-xs opacity-80">{u.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 !mt-12">
                <Button type="button" onClick={prevStep} variant="secondary" size="lg" className="w-full sm:flex-1">
                    <ArrowLeft className="w-5 h-5 mr-1" /> Retour
                </Button>
                <Button type="button" onClick={nextStep} disabled={!canProceedStep2} variant="primary" size="lg" className="w-full sm:flex-1">
                    Suivant <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Votre adresse</h2>
            
            <div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 border-2 rounded-xl focus:border-primary text-base sm:text-lg"
                  placeholder="Votre adresse complète"
                  autoFocus={currentStep === 3}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="button" onClick={prevStep} variant="secondary" size="lg" className="w-full sm:flex-1">
                <ArrowLeft className="w-5 h-5 mr-1" /> Retour
              </Button>
              <Button type="button" onClick={nextStep} disabled={!canProceedStep3} variant="primary" size="lg" className="w-full sm:flex-1">
                Suivant <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Votre téléphone</h2>
            
            <div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 border-2 rounded-xl focus:border-primary text-base sm:text-lg"
                  placeholder="06 12 34 56 78"
                  autoFocus={currentStep === 4}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4">
              <h4 className="font-bold text-base sm:text-lg">Résumé</h4>
              <div className="flex items-start gap-4">
                <span className="text-2xl sm:text-3xl">{SERVICES.find(s => s.id === formData.serviceType)?.icon}</span>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{SERVICES.find(s => s.id === formData.serviceType)?.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px]">{formData.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1" />
                <div>
                    <div className="font-semibold text-sm sm:text-base">
                        {URGENCY_LEVELS.find(u => u.value === formData.urgency)?.desc}
                    </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="button" onClick={prevStep} variant="secondary" size="lg" className="w-full sm:flex-1">
                <ArrowLeft className="w-5 h-5 mr-1" /> Retour
              </Button>
              <Button type="submit" disabled={!canSubmit} variant="primary" size="lg" className="w-full sm:flex-1">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Envoyer
              </Button>
            </div>
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
