import { Phone } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="floating-cta">
      <a
        href="tel:0143380323"
        className="bg-secondary hover:bg-secondary-800 text-white p-4 rounded-full shadow-2xl transition-all flex items-center pulse-urgent"
      >
        <Phone className="w-6 h-6" />
        <span className="hidden md:inline ml-2 font-bold">URGENCE</span>
      </a>
    </div>
  );
}
