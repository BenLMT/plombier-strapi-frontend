# 🚀 Guide Rapide - Changer de Version Hero

## Méthode 1 : Changement Manuel (Le plus simple)

### Pour changer la version utilisée dans votre site:

1. **Ouvrez** `components/adapters/DynamicComponent.tsx`

2. **Modifiez** l'import ligne 6:

```tsx
// ❌ Version actuelle
import HeroWithFormAdapter from "./hero/HeroWithFormAdapter";

// ✅ Changez pour une des options ci-dessous:

// Option A - Version moderne avec cartes
import HeroWithFormAdapter from "./hero/HeroWithFormAdapter_v2";

// Option B - Version minimaliste split diagonal
import HeroWithFormAdapter from "./hero/HeroWithFormAdapter_v3";

// Option C - Version glassmorphism
import HeroWithFormAdapter from "./hero/HeroWithFormAdapter_v4";
```

3. **Sauvegardez** - C'est tout ! Le changement est immédiat.

---

## Méthode 2 : Import Nommé (Plus flexible)

Si vous voulez facilement tester plusieurs versions:

```tsx
// Dans DynamicComponent.tsx
import {
  HeroOriginal,
  HeroModern,
  HeroMinimal,
  HeroGlass
} from "./hero";

// Puis dans le switch:
case "sections.hero-with-form":
  return <HeroGlass data={component} />; // Changez ici
```

---

## Méthode 3 : Basé sur une Variable d'Environnement

Pour changer sans toucher au code:

### 1. Ajoutez dans `.env.local`:
```env
NEXT_PUBLIC_HERO_VERSION=modern
# Options: original | modern | minimal | glass
```

### 2. Modifiez `DynamicComponent.tsx`:
```tsx
import {
  HeroOriginal,
  HeroModern,
  HeroMinimal,
  HeroGlass
} from "./hero";

// Mapping des versions
const heroVersions = {
  original: HeroOriginal,
  modern: HeroModern,
  minimal: HeroMinimal,
  glass: HeroGlass,
};

// Dans le switch:
case "sections.hero-with-form": {
  const version = process.env.NEXT_PUBLIC_HERO_VERSION || 'original';
  const HeroComponent = heroVersions[version] || HeroOriginal;
  return <HeroComponent data={component} />;
}
```

---

## Méthode 4 : Depuis Strapi (Avancé)

Pour choisir la version directement depuis Strapi:

### 1. Ajoutez un champ dans Strapi:
- Type: Enumeration
- Nom: `heroVariant`
- Valeurs: `original`, `modern`, `minimal`, `glass`

### 2. Mettez à jour le type dans `lib/strapi-types.ts`:
```tsx
export interface HeroWithFormSection {
  // ... autres champs
  heroVariant?: 'original' | 'modern' | 'minimal' | 'glass';
}
```

### 3. Utilisez-le dans `DynamicComponent.tsx`:
```tsx
import {
  HeroOriginal,
  HeroModern,
  HeroMinimal,
  HeroGlass
} from "./hero";

case "sections.hero-with-form": {
  const heroVersions = {
    original: HeroOriginal,
    modern: HeroModern,
    minimal: HeroMinimal,
    glass: HeroGlass,
  };
  
  const HeroComponent = heroVersions[component.heroVariant || 'original'];
  return <HeroComponent data={component} />;
}
```

---

## 📊 Comparaison Rapide

| Version | Style | Poids | Animations | Cas d'usage |
|---------|-------|-------|------------|-------------|
| **Original** | Classique | ⚡ Léger | Minimal | Site corporate traditionnel |
| **Modern** | Cartes flottantes | ⚡⚡ Moyen | Hover effects | Site moderne et dynamique |
| **Minimal** | Split diagonal | ⚡ Très léger | Minimal | Positionnement premium |
| **Glass** | Glassmorphism | ⚡⚡⚡ Plus lourd | Animations fluides | Site innovant et impressionnant |

---

## 🎯 Recommandations

- **Test A/B** : Utilisez la Méthode 3 pour tester facilement les versions
- **Performance** : Choisissez Minimal pour les meilleures performances
- **Wow Effect** : Choisissez Glass pour impressionner
- **Équilibre** : Choisissez Modern pour un bon compromis

---

## ⚠️ Important

- **Toutes les versions utilisent les mêmes données** - Aucune modification Strapi nécessaire
- **Le mapping reste identique** - Aucun changement de structure de données
- **Responsive sur tous devices** - Testez quand même sur mobile après changement
- **Performance** : Surveillez les Core Web Vitals après le changement

---

## 🐛 Résolution de Problèmes

**Le changement ne s'applique pas ?**
- Redémarrez le serveur de dev (`npm run dev`)
- Videz le cache du navigateur (Ctrl + Shift + R)

**Erreur d'import ?**
- Vérifiez le chemin d'import
- Assurez-vous que le fichier existe dans `components/adapters/hero/`

**Le style ne correspond pas ?**
- Vérifiez que Tailwind est bien configuré
- Assurez-vous que les classes backdrop-blur sont supportées

---

## 💡 Astuce Pro

Créez des snapshots avant/après pour comparer:
```bash
# Avant changement
npm run build
npm run start
# Prenez un screenshot

# Après changement
npm run build
npm run start
# Comparez les screenshots
```
