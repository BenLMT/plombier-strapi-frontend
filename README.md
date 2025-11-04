# Site de Génération de Leads - Next.js + Strapi

Site moderne de génération de leads pour plombiers (modifiable pour d'autres thématiques) construit avec **Next.js 14** (App Router) et **Strapi CMS**.

## 🚀 Fonctionnalités

### Frontend (Next.js)
- ✅ **Page d'accueil optimisée conversion** avec formulaire de contact
- ✅ **Blog** avec articles dynamiques via Strapi
- ✅ **Annuaire** de professionnels
- ✅ **SEO optimisé** (métadonnées, structured data, sitemap)
- ✅ **Design responsive** avec TailwindCSS
- ✅ **Composants modernes** avec Lucide Icons
- ✅ **Performance** : SSR + ISR avec Next.js 14

### Backend (Strapi)
- ✅ **Gestion des leads** (formulaire de contact)
- ✅ **Blog** avec éditeur rich-text
- ✅ **Annuaire** de professionnels
- ✅ **API REST** automatique
- ✅ **Admin panel** intuitif

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### 1. Installation Frontend (Next.js)

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

### 2. Installation Backend (Strapi) - MÉTHODE SIMPLIFIÉE ✨

**Option A : Utiliser le template pré-configuré (RECOMMANDÉ)**

```bash
# Créer le dossier strapi-template dans votre projet
mkdir strapi-template
cd strapi-template

# Initialiser Strapi avec le template
npx create-strapi-app@latest . --quickstart
```

Puis copiez les fichiers de configuration du template (voir section "Template Strapi" ci-dessous).

**Option B : Installation manuelle classique**

```bash
npx create-strapi-app@latest strapi --quickstart
```

Puis configurez manuellement les Content Types (voir section "Configuration manuelle" ci-dessous).

---

## 📦 Template Strapi Pré-configuré

Pour éviter la configuration chronophage, utilisez les fichiers de schéma pré-configurés :

### Étape 1 : Créer les schémas

Après avoir créé votre projet Strapi, créez ces fichiers dans `strapi/src/api/` :

**`strapi/src/api/lead/content-types/lead/schema.json`** :
```json
{
  "kind": "collectionType",
  "collectionName": "leads",
  "info": {
    "singularName": "lead",
    "pluralName": "leads",
    "displayName": "Lead"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "problem": { "type": "string", "required": true },
    "prenom": { "type": "string", "required": true },
    "telephone": { "type": "string", "required": true },
    "arrondissement": { "type": "string", "required": true },
    "description": { "type": "text" },
    "status": {
      "type": "enumeration",
      "enum": ["nouveau", "contacted", "converted", "lost"],
      "default": "nouveau"
    }
  }
}
```

**`strapi/src/api/article/content-types/article/schema.json`** :
```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title" },
    "excerpt": { "type": "text" },
    "content": { "type": "richtext" },
    "coverImage": { "type": "media", "multiple": false },
    "author": { "type": "string" },
    "category": {
      "type": "enumeration",
      "enum": ["conseils", "actualites", "guides"]
    }
  }
}
```

**`strapi/src/api/professional/content-types/professional/schema.json`** :
```json
{
  "kind": "collectionType",
  "collectionName": "professionals",
  "info": {
    "singularName": "professional",
    "pluralName": "professionals",
    "displayName": "Professional"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "company": { "type": "string" },
    "specialty": { "type": "string" },
    "city": { "type": "string" },
    "postalCode": { "type": "string" },
    "phone": { "type": "string" },
    "email": { "type": "email" },
    "website": { "type": "string" },
    "description": { "type": "text" },
    "photo": { "type": "media", "multiple": false }
  }
}
```

### Étape 2 : Redémarrer Strapi

```bash
cd strapi
npm run develop
```

Les Content Types seront automatiquement créés ! 🎉

### Étape 3 : Configuration rapide

1. **Créer un compte admin** sur http://localhost:1337/admin

2. **Configurer les permissions** (2 minutes) :
   - Settings > Users & Permissions > Public
   - Cocher `find` et `findOne` pour Articles et Professionals
   - Cocher `create` pour Leads
   - Sauvegarder

3. **Créer un API Token** :
   - Settings > API Tokens > Create new API Token
   - Nom : "Next.js Frontend"
   - Type : Full access
   - Copier le token

4. **Configurer les variables d'environnement** :

Créer `.env.local` à la racine :
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=votre_token_ici
```

## 🗂️ Structure du Projet

```
plombier-test/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── leads/        # Endpoint pour les leads
│   ├── blog/             # Pages blog (à créer)
│   ├── annuaire/         # Pages annuaire (à créer)
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux
├── components/            # Composants React
│   ├── EmergencyBar.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ContactForm.tsx
│   ├── ServicesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── WhyUsSection.tsx
│   ├── FAQSection.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   ├── FloatingCTA.tsx
│   └── StructuredData.tsx
├── strapi/               # Backend Strapi (à créer)
├── public/               # Assets statiques
├── package.json
├── next.config.js
└── tailwind.config.ts
```

## 🎨 Personnalisation

### Changer de thématique

Le site est conçu comme un template. Pour changer de thématique :

1. **Modifier les textes** dans les composants
2. **Adapter les services** dans `ServicesSection.tsx`
3. **Changer les couleurs** dans `tailwind.config.ts` et `globals.css`
4. **Mettre à jour le SEO** dans `layout.tsx` et `StructuredData.tsx`

### Ajouter des pages

```bash
# Créer une nouvelle page
app/
  nouvelle-page/
    page.tsx
```

## 📝 Créer du contenu

### Blog
1. Aller sur http://localhost:1337/admin
2. Content Manager > Articles > Create new entry
3. Remplir les champs et publier

### Annuaire
1. Content Manager > Professionals > Create new entry
2. Ajouter les informations du professionnel

Les données seront automatiquement disponibles via l'API Strapi.

## 🚀 Déploiement

### Frontend (Vercel)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Backend (Railway, Heroku, ou VPS)

**Railway** (recommandé) :
1. Aller sur railway.app
2. New Project > Deploy from GitHub
3. Sélectionner le dossier `/strapi`
4. Ajouter une base de données PostgreSQL
5. Configurer les variables d'environnement

## 📊 Gestion des Leads

Les leads sont automatiquement envoyés à Strapi via l'API `/api/leads`.

Vous pouvez :
- Les consulter dans l'admin Strapi
- Les exporter en CSV
- Configurer des webhooks pour notification
- Intégrer avec un CRM (Salesforce, HubSpot, etc.)

## 🔧 Scripts disponibles

```bash
npm run dev          # Développement Next.js
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Linter
npm run strapi       # Lancer Strapi (après installation)
```

## 📚 Documentation

- [Next.js](https://nextjs.org/docs)
- [Strapi](https://docs.strapi.io)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## 🐛 Problèmes courants

### Erreur CORS
Ajouter dans `strapi/config/middlewares.js` :
```js
'strapi::cors': {
  enabled: true,
  origin: ['http://localhost:3000', 'votre-domaine.com']
}
```

### Erreur de connexion Strapi
Vérifier que :
- Strapi tourne sur le port 1337
- Le token API est correctement configuré
- Les permissions publiques sont activées

## 📞 Support

Pour toute question, créer une issue sur le repo GitHub.

## 📄 Licence

MIT
