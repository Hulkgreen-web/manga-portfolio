# 🐉 Documentation Technique - Portfolio "Warrior Saga"

Ce portfolio est une application web moderne de type **Single Page Application (SPA)**, conçue avec une esthétique "Manga/Dragon Ball" unique, alliant performance technique et expérience utilisateur immersive.

## 🛠 Stack Technique Fondamentale

### 1. Core Framework
*   **[React 18](https://reactjs.org/)** : Bibliothèque principale pour la construction de l'interface utilisateur via des composants réutilisables.
*   **[TypeScript](https://www.typescriptlang.org/)** : Surcouche à JavaScript apportant un typage statique pour une meilleure maintenabilité et réduction des bugs.
*   **[Vite](https://vitejs.dev/)** : Outil de build ultra-rapide utilisé pour le développement et le bundling de l'application.

### 2. Styling & Design (Manga Style)
*   **[Tailwind CSS](https://tailwindcss.com/)** : Framework CSS utilitaire permettant un design rapide et responsive.
    *   **Thème Personnalisé** : Configuration de couleurs spécifiques (`dbz-orange`, `dbz-yellow`, `dbz-blue`, `dbz-dark`) et d'effets visuels (`shadow-manga`, `halftone patterns`, `speed-lines`).
*   **[Lucide React](https://lucide.dev/)** : Bibliothèque d'icônes vectorielles légères et cohérentes.
*   **[Framer Motion](https://www.framer.com/motion/)** : Moteur d'animations utilisé pour les transitions de sections, les apparitions au scroll et les effets interactifs "Pop".

### 3. Internationalisation (i18n)
*   **[i18next](https://www.i18next.com/)** & **[react-i18next](https://react.i18next.com/)** : Framework complet pour la gestion des traductions.
*   **[i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)** : Détecte automatiquement la langue du navigateur de l'utilisateur.

---

## 📂 Architecture des Dossiers

```text
src/
├── assets/             # Images, logos et ressources statiques
├── components/         # Composants globaux (Navbar, UI re-utilisable)
├── data/               # Source de vérité (Données du portfolio)
├── hooks/              # Custom hooks (ex: useDarkMode)
├── i18n/               # Configuration et fichiers de traduction (JSON)
├── sections/           # Sections principales de la page (Hero, Projects, etc.)
├── App.tsx             # Composant racine organisant les sections
└── main.tsx            # Point d'entrée de l'application
```

---

## 🚀 Fonctionnalités Clés

### 🌍 Module de Traduction (Multi-langue)
Le système permet de basculer entre le **Français** et l'**Anglais**.
- **Gestion des clés** : Les textes ne sont plus codés en dur dans les composants mais appelés via la fonction `t('cle.message')`.
- **Fichiers Locales** : Situés dans `src/i18n/locales/`, ils permettent d'ajouter facilement de nouvelles langues.
- **Persistance** : Le choix de la langue est mémorisé par le navigateur.

### 🌓 Mode Sombre (Dark Mode)
Intégré nativement avec Tailwind CSS, il permet de passer d'un style "Manga Papier" (clair) à un style "Nuit de Combat" (sombre).
- **Hook dédié** : `useDarkMode.ts` gère l'état et l'application de la classe `.dark` sur le document racine.

### 📱 Responsive Design
L'application est entièrement optimisée pour :
- **Mobiles** : Menu burger dédié et adaptation des grilles de projets.
- **Tablettes & Desktops** : Mise en page multi-colonnes et effets de survol enrichis.

### ✉️ Service d'Envoi de Mail (EmailJS)
L'envoi de messages via le formulaire de contact est géré par **EmailJS**, permettant une gestion sans serveur (backend-less).
- **Configuration** : Les identifiants sont stockés dans les variables d'environnement.
- **Sécurité** : Utilisation de la clé publique pour l'envoi depuis le client.

---

## 🛠 Guide de Modification

### Configurer le Formulaire de Contact
Pour activer le formulaire, vous devez créer un compte sur [EmailJS](https://www.emailjs.com/) et configurer les variables suivantes dans votre fichier `.env` :
```text
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique
```

### Ajouter un Projet ou une Expérience
1. Ouvrez `src/data/portfolioData.ts`.
2. Ajoutez votre nouvel objet avec une `translationKey` unique.
3. Ajoutez les textes correspondants dans `src/i18n/locales/fr.json` et `en.json`.

### Modifier le Thème Visuel
Les couleurs et les ombres "Manga" se configurent dans le fichier `tailwind.config.js`.

---

## 📦 Commandes Utiles

*   `npm run dev` : Lance le serveur de développement.
*   `npm run build` : Génère les fichiers de production optimisés dans le dossier `/dist`.
*   `npm run preview` : Visualise la version de production localement.
