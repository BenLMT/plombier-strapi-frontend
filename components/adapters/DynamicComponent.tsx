import React from "react";
import type { DynamicSection } from "@/lib/strapi-types";

// Import des adaptateurs pour chaque section
import HeroAdapter from "./hero/HeroAdapter";
import HeroWithFormAdapter_v2 from "./hero/HeroWithFormAdapter_v2";
import Process1 from "./process/Process1";
import ServicesShowcaseAdapter from "./ServicesShowcaseAdapter";
import TestimonialsAdapter from "./TestimonialsAdapter";
import CTAUrgenceAdapter from "./CTAUrgenceAdapter";
import ArrondissementsAdapter from "./ArrondissementsAdapter";
import FAQAdapter from "./FAQAdapter";
import SeoContentAdapter from "./SeoContentAdapter";
import MyTestAdapter from "./MyTestAdapter";

interface DynamicComponentProps {
  component: DynamicSection;
}

/**
 * Composant qui rend dynamiquement les sections en fonction de leur type
 * Fait le mapping entre les composants Strapi et les composants React
 * Utilise des adaptateurs pour transformer les données Strapi en composants React
 */
export default function DynamicComponent({ component }: DynamicComponentProps) {
  // Mapping des composants Strapi vers les adaptateurs
  switch (component.__component) {
    case "sections.hero":
      return <HeroAdapter data={component} />;
    
    case "sections.hero-with-form":
      return <HeroWithFormAdapter_v2 data={component} />;
    
    case "sections.process":
      return <Process1 data={component} />;
    
    case "sections.services-showcase":
      return <ServicesShowcaseAdapter data={component} />;
    
    case "sections.testimonials":
      return <TestimonialsAdapter data={component} />;
    
    case "sections.cta-urgence":
      return <CTAUrgenceAdapter data={component} />;
    
    case "sections.arrondissements":
      return <ArrondissementsAdapter data={component} />;
    
    case "sections.faq":
      return <FAQAdapter data={component} />;
    
    case "sections.seo-content":
      return <SeoContentAdapter data={component} />;
    
    case "sections.my-test":
      return <MyTestAdapter data={component} />;
    
    default:
      console.warn(`Component type not found: ${(component as any).__component}`);
      return null;
  }
}
