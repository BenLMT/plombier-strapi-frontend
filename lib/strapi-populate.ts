/**
 * Helper pour générer automatiquement le populate pour les dynamic zones
 * Évite d'avoir à modifier le code à chaque nouveau composant
 */

/**
 * Génère le populate pour la Home Page avec tous les composants de la dynamic zone
 * Ajoute automatiquement le populate pour tous les composants connus
 */
export function getHomePagePopulate() {
  return {
    populate: {
      blocks: {
        on: {
          // Hero sections
          'sections.hero': {
            populate: ['backgroundImage', 'features']
          },
          'sections.hero-with-form': {
            populate: ['backgroundImage', 'features']
          },
          
          // Services
          'sections.services-showcase': {
            populate: {
              services: {
                populate: ['image']
              }
            }
          },
          
          // Social proof
          'sections.testimonials': {
            populate: {
              testimonials: {
                populate: ['avatar']
              }
            }
          },
          
          // CTA & Info
          'sections.cta-urgence': {
            populate: '*'
          },
          'sections.arrondissements': {
            populate: '*'
          },
          
          // Content
          'sections.faq': {
            populate: ['questions']
          },
          'sections.process': {
            populate: ['steps']
          },
          'sections.seo-content': {
            populate: '*'
          },
          'sections.my-test': {
            populate: '*'
          }
          
          // 🎯 Pour ajouter un nouveau composant :
          // 1. Crée-le dans Strapi via Content-Type Builder
          // 2. Ajoute-le à la dynamic zone de Home Page
          // 3. Ajoute-le ici avec son populate
          // 4. Crée l'adapter dans components/adapters/
          // 5. Ajoute-le dans DynamicComponent.tsx
        }
      }
    }
  };
}

export function getHomeSinglePopulate() {
  return {
    populate: {
      hero: {
        populate: ['backgroundImage', 'features'],
      },
      heroWithForm: {
        populate: ['backgroundImage', 'features'],
      },
      process: {
        populate: ['steps'],
      },
      servicesShowcase: {
        populate: {
          services: {
            populate: ['image'],
          },
        },
      },
      testimonials: {
        populate: {
          testimonials: {
            populate: ['avatar'],
          },
        },
      },
      ctaUrgence: {
        populate: '*',
      },
      arrondissements: {
        populate: '*',
      },
      faq: {
        populate: ['questions'],
      },
      seoContent: {
        populate: '*',
      },
      myTest: {
        populate: '*',
      },
      seo: {
        populate: '*',
      },
    },
  };
}

/**
 * Alternative : Populate "deep" pour tout récupérer automatiquement
 * ⚠️ Attention : peut être plus lent et récupérer trop de données
 */
export function getDeepPopulate() {
  return {
    populate: 'deep'
  };
}
