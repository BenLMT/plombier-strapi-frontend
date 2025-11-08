# Process Component Versions

Ce dossier contient différentes versions du component Process avec des UI/UX variées.

## Versions disponibles

### ProcessAdapter (Version Originale)
- **Layout**: Grid 3 colonnes centré
- **Style**: Minimaliste avec numéros et icônes séparés
- **Fond**: Blanc
- **Best for**: Design épuré et simple

### Process1 - Timeline Horizontale
- **Layout**: Timeline horizontale avec ligne de connexion
- **Style**: Icônes avec gradient et badges de numéros
- **Fond**: Gradient purple-50 vers blanc
- **Best for**: Visualiser un processus linéaire étape par étape
- **Features**:
  - Ligne horizontale de connexion (desktop)
  - Icônes avec gradient purple
  - Animation au hover (scale)
  - Responsive avec timeline verticale sur mobile

### Process2 - Layout Vertical
- **Layout**: Vertical avec ligne de progression à gauche
- **Style**: Cards horizontales avec grande ligne verticale
- **Fond**: Blanc
- **Best for**: Processus détaillés nécessitant plus d'espace
- **Features**:
  - Ligne verticale de progression
  - Cards avec hover effect
  - Numéros en watermark
  - Grande taille de texte pour lisibilité

### Process3 - Cards Modernes
- **Layout**: Grid 3 colonnes avec cards
- **Style**: Cards avec effets hover sophistiqués
- **Fond**: Gray-50
- **Best for**: Design moderne et dynamique
- **Features**:
  - Effet lift au hover (translate-y)
  - Numéro en watermark animé
  - Bordure animée en bas de card
  - Décoration circulaire en arrière-plan
  - Icône qui change de couleur au hover

### Process4 - Zigzag Layout
- **Layout**: Alternance gauche-droite (zigzag)
- **Style**: Grandes icônes avec cards horizontales
- **Fond**: Gradient multi-direction purple-50
- **Best for**: Storytelling et parcours narratif
- **Features**:
  - Layout alterné pour dynamisme visuel
  - Grandes icônes (32x32)
  - Flèches de connexion entre étapes
  - Numéros en background géants
  - Bordure gauche colorée sur cards

## Mapping Strapi

Toutes les versions respectent le même mapping de données Strapi:

```typescript
interface ProcessSection {
  __component: 'sections.process';
  id: number;
  title: string;
  subtitle?: string;
  steps: Step[];
}

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon?: string;
}
```

## Icônes disponibles

Les icônes sont mappées via lucide-react:
- `megaphone` - Megaphone
- `file-text` - FileText
- `award` - Award
- `phone` - Phone
- `star` - Star
- `check-circle` - CheckCircle

## Palette de couleurs

Toutes les versions utilisent la même palette:
- **Primary**: `purple-600`, `purple-700`
- **Light**: `purple-100`, `purple-50`
- **Neutral**: `gray-900`, `gray-700`, `gray-600`, `gray-100`, `gray-50`
- **Background**: `white`, gradients purple

## Utilisation

```tsx
import { Process1, Process2, Process3, Process4 } from '@/components/adapters/process';

// Exemple avec Process1
<Process1 data={processData} />

// Exemple avec Process3
<Process3 data={processData} />
```

## Recommandations

- **Process1**: Idéal pour homepage, processus en 3-4 étapes
- **Process2**: Parfait pour pages détaillées, processus en 4-6 étapes
- **Process3**: Meilleur pour landing pages modernes, processus en 3 étapes
- **Process4**: Excellent pour storytelling, processus en 3-5 étapes avec descriptions longues
