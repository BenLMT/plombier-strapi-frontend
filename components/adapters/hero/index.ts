/**
 * Export de toutes les versions du Hero avec formulaire
 * 
 * Import simplifié depuis n'importe où dans l'app:
 * 
 * @example
 * import { HeroOriginal, HeroModern, HeroMinimal, HeroGlass } from "@/components/adapters/hero"
 */

// Version originale - Classique et professionnel
export { default as HeroOriginal } from "./HeroWithFormAdapter";
export { default as HeroWithFormAdapter } from "./HeroWithFormAdapter";

// Version 2 - Moderne avec cartes flottantes
export { default as HeroModern } from "./HeroWithFormAdapter_v2";
export { default as HeroWithFormAdapter_v2 } from "./HeroWithFormAdapter_v2";

// Version 3 - Minimaliste avec split diagonal
export { default as HeroMinimal } from "./HeroWithFormAdapter_v3";
export { default as HeroWithFormAdapter_v3 } from "./HeroWithFormAdapter_v3";

// Version 4 - Glassmorphism ultra moderne
export { default as HeroGlass } from "./HeroWithFormAdapter_v4";
export { default as HeroWithFormAdapter_v4 } from "./HeroWithFormAdapter_v4";
