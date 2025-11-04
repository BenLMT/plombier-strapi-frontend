// Types pour les composants Strapi

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface Badge {
  id: number;
  icon: string;
  text: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  description?: string;
  price?: string;
  icon?: string;
  image?: StrapiImage;
  features?: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  content: string;
  rating: number;
  avatar?: StrapiImage;
  location?: string;
  date?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// Types pour les sections

export interface FeatureItem {
  id: number;
  icon: 'shield-check' | 'clock' | 'arrow-right' | 'phone' | 'star' | 'check';
  title: string;
  description: string;
}

export interface HeroSection {
  __component: 'sections.hero';
  id: number;
  topBadgeText?: string;
  title: string;
  features?: FeatureItem[];
  ctaText?: string;
  ctaUrl?: string;
  trustpilotScore?: string;
  trustpilotReviews?: string;
  backgroundImage?: StrapiImage;
  bottomText?: string;
  partners?: string[];
}

export interface HeroWithFormSection {
  __component: 'sections.hero-with-form';
  id: number;
  topBadgeText?: string;
  title: string;
  subtitle?: string;
  features?: FeatureItem[];
  backgroundImage?: StrapiImage;
  formTitle?: string;
  formSubtitle?: string;
  formButtonText?: string;
  showPhoneField?: boolean;
  showEmailField?: boolean;
  showAddressField?: boolean;
  showServiceTypeField?: boolean;
  showUrgencyField?: boolean;
  showMessageField?: boolean;
  trustpilotScore?: string;
  trustpilotReviews?: string;
  bottomText?: string;
  partners?: string[];
}

export interface ProcessSection {
  __component: 'sections.process';
  id: number;
  title: string;
  subtitle?: string;
  steps: Step[];
}

export interface ServicesShowcaseSection {
  __component: 'sections.services-showcase';
  id: number;
  title: string;
  subtitle?: string;
  services: ServiceCard[];
}

export interface TestimonialsSection {
  __component: 'sections.testimonials';
  id: number;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  showTrustpilot: boolean;
}

export interface CtaUrgenceSection {
  __component: 'sections.cta-urgence';
  id: number;
  title: string;
  description: string;
  ctaText: string;
  phoneNumber: string;
  backgroundColor: 'primary' | 'secondary' | 'danger' | 'warning';
  features?: string[];
}

export interface ArrondissementsSection {
  __component: 'sections.arrondissements';
  id: number;
  title: string;
  subtitle?: string;
  showAllArrondissements: boolean;
  layout: 'grid' | 'list' | 'map';
}

export interface FaqSection {
  __component: 'sections.faq';
  id: number;
  title: string;
  subtitle?: string;
  questions: FaqItem[];
}

export interface SeoContentSection {
  __component: 'sections.seo-content';
  id: number;
  title?: string;
  content: string;
  showTableOfContents?: boolean;
  backgroundColor?: 'white' | 'gray' | 'primary-light';
}

export interface MyTestSection {
  __component: 'sections.my-test';
  id: number;
  SEO_Content: string;
}

// Union type pour tous les types de sections
export type DynamicSection =
  | HeroSection
  | HeroWithFormSection
  | ProcessSection
  | ServicesShowcaseSection
  | TestimonialsSection
  | CtaUrgenceSection
  | ArrondissementsSection
  | FaqSection
  | SeoContentSection
  | MyTestSection;

// Type pour la homepage
export interface HomePage {
  id: number;
  documentId: string;
  seo?: any; // À compléter si nécessaire
  blocks: DynamicSection[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}
