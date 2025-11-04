/**
 * Script pour peupler Strapi avec les 20 arrondissements de Paris
 * Usage: node scripts/seed-arrondissements.js
 */

const arrondissements = [
  {
    numero: 1,
    nom: "1er arrondissement",
    slug: "paris-1",
    titre_h1: "Plombier Paris 1er - Dépannage Rapide 24h/24",
    meta_title: "Plombier Paris 1er | Intervention Rapide & Devis Gratuit",
    meta_description: "Plombier professionnel à Paris 1er. Dépannage urgent, débouchage, fuite d'eau. Intervention rapide 7j/7. Devis gratuit. Artisans certifiés.",
    hero_titre: "Un plombier fiable chez vous à Paris 1er, sans attendre !",
    hero_sous_titre: "Louvre, Châtelet, Les Halles - Intervention rapide",
    quartiers: "Louvre, Châtelet, Les Halles, Palais-Royal, Place Vendôme",
    contenu_seo: `<h2>Votre plombier de confiance dans le 1er arrondissement</h2>
<p>Le 1er arrondissement de Paris, cœur historique de la capitale, nécessite des interventions de plomberie adaptées à ses bâtiments anciens et classés. Nos plombiers professionnels interviennent rapidement dans tout le secteur : Louvre, Châtelet, Les Halles, Palais-Royal.</p>
<h3>Services de plomberie Paris 1er</h3>
<ul>
<li>Dépannage urgent 24h/24</li>
<li>Débouchage canalisations</li>
<li>Réparation fuite d'eau</li>
<li>Installation sanitaire</li>
<li>Entretien chauffe-eau</li>
</ul>`,
    prix_moyen: "À partir de 100€",
    temps_intervention: "Sous 1h",
  },
  // Ajoutez les 19 autres arrondissements ici
];

async function seedArrondissements() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || 'votre-token-ici';

  console.log('🚀 Début du peuplement des arrondissements...\n');

  for (const arr of arrondissements) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/arrondissements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({ data: arr }),
      });

      if (response.ok) {
        console.log(`✅ Arrondissement ${arr.numero} créé avec succès`);
      } else {
        const error = await response.json();
        console.error(`❌ Erreur pour l'arrondissement ${arr.numero}:`, error);
      }
    } catch (error) {
      console.error(`❌ Erreur réseau pour l'arrondissement ${arr.numero}:`, error.message);
    }
  }

  console.log('\n✨ Peuplement terminé !');
}

// Pour les 20 arrondissements - génération automatique
function generateAllArrondissements() {
  const ordinals = ['1er', '2ème', '3ème', '4ème', '5ème', '6ème', '7ème', '8ème', '9ème', '10ème',
                    '11ème', '12ème', '13ème', '14ème', '15ème', '16ème', '17ème', '18ème', '19ème', '20ème'];
  
  const quartiers = [
    "Louvre, Châtelet, Les Halles, Palais-Royal",
    "Bourse, Sentier, Montorgueil",
    "Marais, Archives, Temple",
    "Île de la Cité, Île Saint-Louis, Notre-Dame",
    "Quartier Latin, Panthéon, Sorbonne",
    "Saint-Germain-des-Prés, Odéon, Luxembourg",
    "Tour Eiffel, Invalides, Musée d'Orsay",
    "Champs-Élysées, Madeleine, Concorde",
    "Opéra, Grands Boulevards, Pigalle",
    "Gare du Nord, Gare de l'Est, Canal Saint-Martin",
    "Bastille, Nation, République, Oberkampf",
    "Bercy, Gare de Lyon, Daumesnil",
    "Place d'Italie, Butte-aux-Cailles, Bibliothèque",
    "Montparnasse, Denfert-Rochereau, Alésia",
    "Tour Montparnasse, Convention, Vaugirard",
    "Passy, Trocadéro, Auteuil",
    "Batignolles, Parc Monceau, Ternes",
    "Montmartre, Sacré-Cœur, Pigalle",
    "Buttes-Chaumont, Belleville, La Villette",
    "Ménilmontant, Père-Lachaise, Belleville"
  ];

  const allArrondissements = [];
  
  for (let i = 1; i <= 20; i++) {
    allArrondissements.push({
      numero: i,
      nom: `${ordinals[i-1]} arrondissement`,
      slug: `paris-${i}`,
      titre_h1: `Plombier Paris ${ordinals[i-1]} - Dépannage Rapide 24h/24`,
      meta_title: `Plombier Paris ${ordinals[i-1]} | Intervention Rapide & Devis Gratuit`,
      meta_description: `Plombier professionnel à Paris ${ordinals[i-1]}. Dépannage urgent, débouchage, fuite d'eau. Intervention rapide 7j/7. Devis gratuit.`,
      hero_titre: `Un plombier fiable chez vous à Paris ${ordinals[i-1]}, sans attendre !`,
      hero_sous_titre: `${quartiers[i-1]} - Intervention rapide`,
      quartiers: quartiers[i-1],
      contenu_seo: `<h2>Votre plombier de confiance dans le ${ordinals[i-1]} arrondissement</h2>
<p>Nos plombiers professionnels interviennent rapidement dans tout le ${ordinals[i-1]} arrondissement de Paris : ${quartiers[i-1]}. Service disponible 24h/24, 7j/7 pour toutes vos urgences de plomberie.</p>
<h3>Nos services de plomberie Paris ${ordinals[i-1]}</h3>
<ul>
<li><strong>Dépannage urgent 24h/24</strong> : Fuite d'eau, canalisation bouchée</li>
<li><strong>Débouchage</strong> : WC, évier, douche, baignoire</li>
<li><strong>Installation</strong> : Robinetterie, sanitaires, chauffe-eau</li>
<li><strong>Réparation</strong> : Fuite, ballon d'eau chaude, tuyauterie</li>
<li><strong>Entretien</strong> : Chaudière, chauffe-eau, plomberie générale</li>
</ul>
<p>Nos tarifs sont transparents et compétitifs. Devis gratuit sur place, intervention rapide, artisans qualifiés et assurés.</p>`,
      prix_moyen: "À partir de 100€",
      temps_intervention: "Sous 1h",
    });
  }
  
  return allArrondissements;
}

// Exporter pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateAllArrondissements, seedArrondissements };
}

console.log(`
📝 INSTRUCTIONS:

1. Assurez-vous que Strapi est démarré: npm run strapi
2. Récupérez votre API Token dans Strapi Admin -> Settings -> API Tokens
3. Créez un fichier .env.local et ajoutez:
   STRAPI_API_TOKEN=votre_token_ici
4. Exécutez: node scripts/seed-arrondissements.js

Ou créez manuellement les arrondissements dans Strapi Admin.
`);
