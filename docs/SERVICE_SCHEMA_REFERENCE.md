# Référence Schéma Service - Strapi

## 📋 Vue d'ensemble

Ce document détaille le format exact attendu pour chaque champ du type de contenu "Service" dans Strapi.

---

## 📝 Champs Texte

### `nom` (string, requis)
Nom du service affiché partout.

**Exemple** : `"Réparation de Fuite d'Eau"`

---

### `slug` (uid, requis)
URL-friendly, généré automatiquement depuis `nom`.

**Exemple** : `"reparation-fuite-eau"`

---

### `description_courte` (text, 300 max)
Texte court affiché dans le hero et les cards de preview.

**Longueur recommandée** : 150-300 caractères  
**Format** : Texte brut (pas de Markdown)

**Exemple** :
```
Intervention rapide pour localiser et réparer toutes vos fuites d'eau. Disponible 24h/24 à Paris et Île-de-France.
```

---

### `description_longue` (richtext)
Contenu principal en **Markdown**.  
Utilisé comme **fallback** si `contentSections` est vide.

**Format** : Markdown  
**Exemple** :
```markdown
## Pourquoi choisir notre service ?

Nos plombiers experts interviennent rapidement pour :

- Localiser la fuite avec précision
- Réparer durablement
- Éviter les dégâts des eaux

### Équipement professionnel

Nous utilisons des **détecteurs thermiques** et acoustiques.
```

---

### `contentCKE` (richtext, optionnel)
Contenu alternatif en **Markdown**.  
**Prioritaire** sur `description_longue` si rempli.

**Format** : Markdown  
**Usage** : Même format que `description_longue`

---

### `excerpt` (text, 300 max, optionnel)
Résumé court pour SEO et previews.

**Format** : Texte brut  
**Exemple** :
```
Service de réparation de fuite d'eau à Paris. Intervention rapide 24h/24, devis gratuit, artisans certifiés.
```

---

## 💰 Champs Prix

### `prix_min` (integer, requis)
Prix minimum en euros.

**Exemple** : `80`

---

### `prix_max` (integer, requis)
Prix maximum en euros.

**Exemple** : `250`

---

## 🎨 Champs Visuels

### `icone` (string)
Nom de l'icône Lucide React.

**Valeurs possibles** : `"Wrench"`, `"Droplet"`, `"Hammer"`, `"Zap"`, etc.  
**Exemple** : `"Wrench"`

---

### `image` (media, optionnel)
Image principale du service (usage futur).

**Format** : Image uploadée dans Strapi  
**Taille recommandée** : 800x600px

---

### `coverImage` (media, optionnel)
Image de couverture affichée dans le hero.

**Format** : Image uploadée dans Strapi  
**Taille recommandée** : 1200x800px  
**Poids max** : 200KB (optimisé)

---

## 🏷️ Champs Catégorie

### `category` (string)
Catégorie du service pour le regroupement.

**Exemples** : `"Plomberie"`, `"Chauffage"`, `"Urgence"`, `"Rénovation"`

---

### `populaire` (boolean)
Service populaire (badge affiché).

**Valeurs** : `true` ou `false`

---

### `urgence` (boolean)
Service d'urgence 24h/24 (badge rouge affiché).

**Valeurs** : `true` ou `false`

---

## 📊 Champs JSON Structurés

### `avantages` (json)
Liste des avantages du service.

**Format JSON** :
```json
[
  {
    "title": "Intervention Rapide",
    "description": "Nos équipes interviennent en moins de 2h sur Paris et Île-de-France."
  },
  {
    "title": "Garantie Décennale",
    "description": "Tous nos travaux sont couverts par une garantie décennale."
  },
  {
    "title": "Devis Gratuit",
    "description": "Nous établissons un devis détaillé et transparent avant toute intervention."
  }
]
```

**Affichage** : Cards 3 colonnes avec icône CheckCircle

---

### `processus` (json)
Étapes du processus d'intervention.

**Format JSON** :
```json
[
  {
    "title": "Prise de contact",
    "description": "Vous nous appelez ou remplissez le formulaire. Nous vous recontactons sous 15 minutes."
  },
  {
    "title": "Diagnostic",
    "description": "Un plombier se déplace pour évaluer la situation et vous propose un devis."
  },
  {
    "title": "Intervention",
    "description": "Nous réparons la fuite avec du matériel professionnel et des pièces de qualité."
  },
  {
    "title": "Suivi",
    "description": "Nous vérifions que tout fonctionne et vous donnons des conseils d'entretien."
  }
]
```

**Affichage** : Timeline verticale numérotée (1, 2, 3, 4...)

---

### `faq` (json)
Questions fréquentes sur le service.

**Format JSON** :
```json
[
  {
    "question": "Intervenez-vous en urgence ?",
    "answer": "Oui, nous sommes disponibles 24h/24 et 7j/7 pour toute urgence. Nos équipes peuvent intervenir en moins de 2h sur Paris."
  },
  {
    "question": "Le devis est-il gratuit ?",
    "answer": "Absolument ! Nous établissons un devis détaillé et gratuit avant toute intervention. Aucune surprise sur la facture finale."
  },
  {
    "question": "Quels sont vos délais d'intervention ?",
    "answer": "Pour une urgence : moins de 2h. Pour un rendez-vous planifié : sous 48h maximum."
  }
]
```

**Affichage** : Accordéon avec animation

---

### `testimonials` (json)
Témoignages clients (non utilisé actuellement).

**Format JSON** :
```json
[
  {
    "name": "Marie D.",
    "text": "Intervention rapide et efficace. Le plombier était très professionnel.",
    "rating": 5
  }
]
```

---

### `contentSections` (json)
**Nouveau système** : Sections de contenu avec images alternées.

**Format JSON** :
```json
[
  {
    "title": "Détection Professionnelle",
    "content": "Nos plombiers utilisent des **équipements de pointe** :\n\n- Caméra thermique\n- Détecteur acoustique\n- Gaz traceur\n\nCette approche permet d'éviter les travaux inutiles.",
    "image": {
      "url": "/uploads/detection_fuite_abc123.jpg",
      "alternativeText": "Plombier utilisant un détecteur"
    }
  },
  {
    "title": "Réparation Durable",
    "content": "Une fois la fuite localisée, nous procédons à la réparation avec des **matériaux de qualité professionnelle**.\n\nNos interventions sont garanties.",
    "image": {
      "url": "/uploads/reparation_tuyau_def456.jpg",
      "alternativeText": "Réparation d'un tuyau"
    }
  }
]
```

**Champs** :
- `title` (string) : Titre de la section
- `content` (string) : Contenu en **Markdown**
- `image` (object, optionnel) :
  - `url` (string) : Chemin Strapi de l'image
  - `alternativeText` (string, optionnel) : Texte alternatif

**Affichage** :
- Section 1 : Texte gauche, Image droite
- Section 2 : Image gauche, Texte droite
- Section 3 : Texte gauche, Image droite
- Etc.

**Responsive** : Stack vertical sur mobile

---

## 🎯 Ordre de Priorité du Contenu

1. **Si `contentSections` est rempli** → Affiche les sections alternées
2. **Sinon, si `contentCKE` est rempli** → Affiche ce contenu
3. **Sinon, si `description_longue` est rempli** → Affiche ce contenu
4. **Sinon** → Pas de contenu principal

---

## ✅ Exemple Complet

```json
{
  "nom": "Réparation de Fuite d'Eau",
  "slug": "reparation-fuite-eau",
  "description_courte": "Intervention rapide pour localiser et réparer toutes vos fuites d'eau. Disponible 24h/24.",
  "prix_min": 80,
  "prix_max": 250,
  "icone": "Droplet",
  "category": "Urgence",
  "populaire": true,
  "urgence": true,
  "coverImage": {
    "url": "/uploads/fuite_eau_hero.jpg"
  },
  "contentSections": [
    {
      "title": "Détection Professionnelle",
      "content": "Nos plombiers utilisent des **équipements de pointe**...",
      "image": {
        "url": "/uploads/detection.jpg"
      }
    }
  ],
  "avantages": [
    {
      "title": "Intervention Rapide",
      "description": "En moins de 2h sur Paris."
    }
  ],
  "processus": [
    {
      "title": "Prise de contact",
      "description": "Vous nous appelez..."
    }
  ],
  "faq": [
    {
      "question": "Intervenez-vous en urgence ?",
      "answer": "Oui, 24h/24 et 7j/7."
    }
  ]
}
```

---

## 🚀 Conseils

### Markdown
- Utilisez `**gras**` pour les mots importants
- Utilisez des listes `- item` pour la lisibilité
- Utilisez `## Titre` pour les sous-sections

### Images
- **Format** : JPG ou WebP optimisé
- **Taille** : 1200x800px pour coverImage, 800x600px pour sections
- **Poids** : < 200KB après compression
- **Alt text** : Toujours renseigner pour l'accessibilité

### Longueurs
- **description_courte** : 150-300 caractères
- **avantages.description** : 50-100 caractères
- **processus.description** : 100-150 caractères
- **faq.answer** : 100-200 caractères
- **contentSections.content** : 100-300 mots

### Nombre d'éléments
- **avantages** : 3-6 items
- **processus** : 3-5 étapes
- **faq** : 3-8 questions
- **contentSections** : 2-4 sections
