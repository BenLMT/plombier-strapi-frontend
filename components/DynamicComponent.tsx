import React from "react";
import type { DynamicSection } from "@/lib/strapi-types";

// Import des adaptateurs pour chaque section
import HeroAdapter from "./adapters/HeroAdapter";
import HeroWithFormAdapter from "./adapters/HeroWithFormAdapter";
import ProcessAdapter from "./adapters/ProcessAdapter";
import ServicesShowcaseAdapter from "./adapters/ServicesShowcaseAdapter";
import TestimonialsAdapter from "./adapters/TestimonialsAdapter";
import CTAUrgenceAdapter from "./adapters/CTAUrgenceAdapter";
import ArrondissementsAdapter from "./adapters/ArrondissementsAdapter";
import FAQAdapter from "./adapters/FAQAdapter";
import SeoContentAdapter from "./adapters/SeoContentAdapter";
import MyTestAdapter from "./adapters/MyTestAdapter";

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
      return <HeroWithFormAdapter data={component} />;
    
    case "sections.process":
      return <ProcessAdapter data={component} />;
    
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
