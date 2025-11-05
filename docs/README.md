# 📚 Documentation - Système de Services

Bienvenue dans la documentation du système de services pour le site de plomberie (adaptable à d'autres métiers d'artisan).

## 📖 Guides Disponibles

### 1. [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) - Guide Principal
**À lire en premier !**

Contenu :
- 📋 Vue d'ensemble du système
- 🎨 Structure des fichiers créés
- 🗂️ Schéma Strapi et champs disponibles
- 🎨 Palette de couleurs
- 📝 Exemples de données JSON
- 🔗 Routes disponibles
- 🔄 Adaptabilité pour d'autres métiers

**Quand l'utiliser :** Pour comprendre l'architecture globale et configurer Strapi.

---

### 2. [SERVICES_EXAMPLES.md](./SERVICES_EXAMPLES.md) - Exemples de Code
**Pour les développeurs**

Contenu :
- 📚 Exemples d'intégration dans différentes pages
- 🎯 Cas d'usage spécifiques (populaires, urgences, catégories)
- 🛠️ Utilisation de `ServicesSectionDynamic`
- 🎨 Utilisation de `ServiceAdapter`
- 📋 Props et configuration

**Quand l'utiliser :** Pour intégrer les services dans vos pages Next.js.

---

### 3. [SERVICES_MIGRATION.md](./SERVICES_MIGRATION.md) - Guide de Migration
**Pour la mise en production**

Contenu :
- 🔄 Mise à jour des liens de navigation
- 🗺️ Configuration du sitemap
- 🎯 Metadata et SEO
- 🔍 Redirections d'anciennes URLs
- ✅ Checklist complète de migration
- 🚨 Points d'attention

**Quand l'utiliser :** Pour migrer un site existant ou déployer en production.

---

## 🚀 Quick Start

### Pour commencer rapidement :

1. **Configuration Strapi** (10 min)
   - Lire [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) section "Schéma Strapi"
   - Importer le schema.json
   - Créer 3-5 services de test

2. **Intégration Frontend** (20 min)
   - Lire [SERVICES_EXAMPLES.md](./SERVICES_EXAMPLES.md) exemples 1-2
   - Ajouter `<ServicesSectionDynamic />` sur la homepage
   - Tester les pages `/services` et `/service/[slug]`

3. **Personnalisation** (30 min)
   - Adapter les textes et images
   - Mettre à jour les numéros de téléphone
   - Configurer les catégories

4. **Production** (20 min)
   - Suivre [SERVICES_MIGRATION.md](./SERVICES_MIGRATION.md)
   - Checklist de déploiement
   - SEO et sitemap

**Total : ~1h30 pour un système complet et fonctionnel**

---

## 📁 Structure des Fichiers

```
plombier-test/
├── app/
│   ├── service/
│   │   └── [slug]/
│   │       └── page.tsx          # Page détail d'un service
│   └── services/
│       └── page.tsx               # Page liste tous les services
├── components/
│   ├── adapters/
│   │   └── ServiceAdapter.tsx    # Composant réutilisable
│   └── ServicesSectionDynamic.tsx # Section pour homepage
├── strapi/
│   └── src/api/service/
│       └── content-types/service/
│           └── schema.json        # Schéma Strapi
└── docs/
    ├── README.md                  # Ce fichier
    ├── SERVICES_GUIDE.md          # Guide principal
    ├── SERVICES_EXAMPLES.md       # Exemples de code
    └── SERVICES_MIGRATION.md      # Guide de migration
```

---

## 🎯 Cas d'Usage par Rôle

### 👨‍💼 Chef de Projet / Product Owner
**Lire :**
- [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) - Vue d'ensemble
- [SERVICES_MIGRATION.md](./SERVICES_MIGRATION.md) - Checklist

**Objectif :** Comprendre le scope et planifier le déploiement.

---

### 👨‍💻 Développeur Frontend
**Lire :**
- [SERVICES_EXAMPLES.md](./SERVICES_EXAMPLES.md) - Tous les exemples
- [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) - Structure technique

**Objectif :** Intégrer les services dans les pages Next.js.

---

### 🎨 Intégrateur / Designer
**Lire :**
- [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) - Palette de couleurs
- [SERVICES_EXAMPLES.md](./SERVICES_EXAMPLES.md) - Variants d'affichage

**Objectif :** Personnaliser le design et adapter aux besoins.

---

### 🔧 Admin Strapi / Content Manager
**Lire :**
- [SERVICES_GUIDE.md](./SERVICES_GUIDE.md) - Schéma et exemples de données
- [SERVICES_MIGRATION.md](./SERVICES_MIGRATION.md) - Checklist Backend

**Objectif :** Configurer Strapi et créer les contenus.

---

## 🎨 Design System

### Couleurs Principales
- **Primary** (Bleu marine) : Identité, navigation, titres
- **Secondary** (Violet) : Accents, catégories, badges
- **Accent** (Jaune) : CTA, prix, éléments importants

### Composants
- **ServiceAdapter** : 3 variants (card, list, featured)
- **ServicesSectionDynamic** : Section configurable
- **Pages** : Service détail, Services liste

### Responsive
- Mobile-first
- Breakpoints : sm, md, lg (Tailwind CSS)
- CTA sticky mobile

---

## 🔄 Workflow de Développement

### 1. Développement Local
```bash
# Lancer Strapi (backend)
cd strapi
npm run develop

# Lancer Next.js (frontend)
npm run dev
```

### 2. Créer un nouveau service
1. Aller dans Strapi Admin (http://localhost:1337/admin)
2. Content Manager → Services → Create new entry
3. Remplir les champs requis
4. Publish

### 3. Tester
- Liste : http://localhost:3000/services
- Détail : http://localhost:3000/service/[votre-slug]

---

## 📞 Support & Questions

### Problèmes fréquents

**Q : Les services ne s'affichent pas**
- Vérifier que Strapi est lancé
- Vérifier `NEXT_PUBLIC_STRAPI_API_URL` dans `.env.local`
- Vérifier que les services sont publiés dans Strapi

**Q : Les images ne se chargent pas**
- Vérifier le champ `coverImage` dans Strapi
- Vérifier les permissions d'upload dans Strapi
- Vérifier que `NEXT_PUBLIC_STRAPI_API_URL` est correct

**Q : Les slugs ne fonctionnent pas**
- Les slugs doivent être uniques
- Les slugs doivent correspondre aux liens du Footer/Header
- Vérifier la casse (lowercase recommandé)

---

## 🚀 Prochaines Étapes

### Améliorations Possibles
- [ ] Filtres avancés sur la page `/services`
- [ ] Recherche de services
- [ ] Système de notation/avis
- [ ] Galerie photos par service
- [ ] Formulaire de demande de devis spécifique par service
- [ ] Pages landing SEO par arrondissement x service

### Extensions
- [ ] API REST pour applications mobiles
- [ ] Export PDF des services
- [ ] Intégration calendrier de réservation
- [ ] Chat en direct

---

## 📚 Ressources Externes

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

---

## 📝 Changelog

### Version 1.0.0 (Initial)
- ✅ Schéma Strapi complet
- ✅ Pages service/[slug] et services
- ✅ ServiceAdapter avec 3 variants
- ✅ ServicesSectionDynamic
- ✅ Documentation complète
- ✅ Template adaptable autres métiers

---

**Dernière mise à jour :** Novembre 2024
**Auteur :** Équipe Dev Plomberie Paris
**License :** MIT (adaptable pour usage commercial)
