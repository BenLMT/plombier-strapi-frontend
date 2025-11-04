"use client";

import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

interface CallButtonProps {
  phoneNumber: string;
  text: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Composant Client isolé pour les boutons d'appel
 * Île d'interactivité minimale
 */
export default function CallButton({ 
  phoneNumber, 
  text, 
  variant = "primary",
  size = "lg",
  className 
}: CallButtonProps) {
  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={() => window.location.href = `tel:${phoneNumber}`}
    >
      <Phone className="w-5 h-5 mr-2" />
      {text}
    </Button>
  );
}
