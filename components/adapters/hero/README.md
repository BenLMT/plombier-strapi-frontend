# Versions Hero avec Formulaire

Ce dossier contient différentes versions de la section Hero avec formulaire. Toutes les versions utilisent le même mapping de données Strapi et la même palette de couleurs.

## 📋 Versions Disponibles

### Version Originale - `HeroWithFormAdapter.tsx`
**Style:** Classique et professionnel
- Layout horizontal avec texte à gauche et formulaire à droite
- Background image avec overlay gradient
- Features en liste verticale avec icônes
- Badge Trustpilot compact
- Section partenaires simple en bas

**Utilisation recommandée:** Design professionnel et sobre, idéal pour une présentation traditionnelle

---

### Version 2 - `HeroWithFormAdapter_v2.tsx`
**Style:** Moderne avec cartes flottantes et effets de profondeur
- Cartes empilées avec effet de décalage progressif
- Cercles décoratifs en arrière-plan
- Formulaire sticky qui suit le scroll
- Features en cartes individuelles avec effet hover
- Badge Trustpilot en carte blanche
- Partenaires en cartes individuelles

**Points forts:**
- ✨ Effets visuels modernes (hover, scale, shadow)
- 🎨 Profondeur visuelle avec les cartes empilées
- 📱 Excellente lisibilité sur tous supports

**Utilisation recommandée:** Pour un site moderne et dynamique qui veut se démarquer

---

### Version 3 - `HeroWithFormAdapter_v3.tsx`
**Style:** Minimaliste avec split diagonal
- Division diagonale de l'écran (gauche bleu / droite blanc)
- Design épuré et aéré
- Ligne accent en haut du titre
- Features en liste simple et élégante
- Trustpilot inline minimaliste
- Partenaires en ligne avec effet hover

**Points forts:**
- 🎯 Design très épuré et professionnel
- ⚡ Rapide à charger (moins d'effets)
- 👁️ Contraste fort pour une excellente lisibilité
- 📐 Géométrie forte avec le split diagonal

**Utilisation recommandée:** Pour un positionnement haut de gamme et professionnel

---

### Version 4 - `HeroWithFormAdapter_v4.tsx`
**Style:** Glassmorphism ultra moderne
- Effets de verre avec backdrop-blur
- Bulles flottantes animées en arrière-plan
- Badge flottant avec sparkles
- Formulaire avec effet glow
- Toutes les cartes avec effet glass
- Footer en carte glass

**Points forts:**
- 🌟 Design très moderne et tendance
- ✨ Animations fluides et subtiles
- 🔮 Effets de transparence et de profondeur
- 💎 Look premium et sophistiqué

**Utilisation recommandée:** Pour un site innovant et moderne qui veut impressionner

---

## 🎨 Palette de Couleurs (Commune à toutes les versions)

- **Primary:** Bleu (couleur principale de la marque)
- **Accent:** Jaune/Orange (pour les CTA et points d'attention)
- **Success:** Vert (pour Trustpilot et validations)
- **White:** Blanc avec opacités variables pour les effets

## 📊 Mapping de Données (Strapi)

Toutes les versions utilisent le type `HeroWithFormSection` avec les champs suivants:

```typescript
{
  title: string;              // Titre principal
  subtitle?: string;          // Sous-titre optionnel
  backgroundImage?: {         // Image de fond
    url: string;
    alternativeText: string;
  };
  topBadgeText?: string;      // Badge en haut (ex: "Meilleure Enseigne 2025")
  features?: Array<{          // Liste des features/avantages
    id: number;
    icon: string;             // 'shield-check', 'clock', 'star', 'check'
    title: string;
    description: string;
  }>;
  trustpilotScore?: string;   // Note Trustpilot (ex: "Bien")
  trustpilotReviews?: string; // Nombre d'avis
  bottomText?: string;        // Texte au-dessus des logos partenaires
  partners?: string[];        // Liste des partenaires
}
```

## 🔄 Comment Changer de Version

1. Dans votre page ou composant parent, importez la version souhaitée:

```tsx
// Version originale
import HeroWithFormAdapter from "@/components/adapters/hero/HeroWithFormAdapter";

// Version 2 - Cartes modernes
import HeroWithFormAdapter_v2 from "@/components/adapters/hero/HeroWithFormAdapter_v2";

// Version 3 - Split diagonal
import HeroWithFormAdapter_v3 from "@/components/adapters/hero/HeroWithFormAdapter_v3";

// Version 4 - Glassmorphism
import HeroWithFormAdapter_v4 from "@/components/adapters/hero/HeroWithFormAdapter_v4";
```

2. Utilisez le composant avec vos données:

```tsx
<HeroWithFormAdapter_v2 data={heroData} />
```

## 💡 Conseils d'Utilisation

- **Performance:** La version 3 (minimaliste) est la plus légère
- **Mobile:** Toutes les versions sont responsive
- **Animations:** Les versions 2 et 4 ont plus d'animations (désactiver si besoin de performance)
- **Accessibilité:** Toutes les versions respectent les normes d'accessibilité

## 🔧 Personnalisation

Pour créer une nouvelle version:
1. Copiez l'une des versions existantes
2. Modifiez uniquement le JSX et les styles Tailwind
3. **NE PAS modifier** le mapping des props et des données
4. Gardez la même palette de couleurs pour la cohérence

## 📝 Notes

- Le formulaire `MultiStepForm4` est commun à toutes les versions
- Les icônes utilisées viennent de `lucide-react`
- Les images sont optimisées avec Next.js Image
