import React from "react";
import DynamicComponent from "./DynamicComponent";
import type { DynamicSection } from "@/lib/strapi-types";

interface DynamicZoneProps {
  blocks: DynamicSection[];
}

/**
 * Composant qui rend une liste de sections dynamiques
 * C'est l'équivalent de la Dynamic Zone de Strapi côté frontend
 */
export default function DynamicZone({ blocks }: DynamicZoneProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Aucun contenu à afficher</p>
      </div>
    );
  }

  return (
    <>
      {blocks.map((block, index) => (
        <DynamicComponent key={`${block.__component}-${block.id || index}`} component={block} />
      ))}
    </>
  );
}
