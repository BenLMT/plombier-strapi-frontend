"use client";

import Button from "@/components/ui/Button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

interface ActionButtonProps {
  text: string;
  url: string;
  icon?: "arrow-right" | "phone" | "mail" | "map-pin";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Mapping des icônes
const iconMap = {
  "arrow-right": ArrowRight,
  "phone": Phone,
  "mail": Mail,
  "map-pin": MapPin,
};

/**
 * Composant Client isolé pour les boutons avec action
 * Île d'interactivité minimale
 */
export default function ActionButton({ 
  text, 
  url,
  icon,
  variant = "primary",
  size = "lg",
  className 
}: ActionButtonProps) {
  const Icon = icon ? iconMap[icon] : null;
  
  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={() => window.location.href = url}
    >
      {Icon && <Icon className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />}
      {text}
    </Button>
  );
}
