# Task Loader - Client

Application de gestion de tâches de type Kanban (clone Trello) développée avec React.

> **Note**: L'API backend est basée sur Strapi et se trouve dans un dépôt séparé.

---

## Architecture

```
1PRO2-Client/
├── assets/                 # Ressources statiques (icônes, images)
├── script/                 # Logique métier et services
│   ├── services/          # Services API (CRUD)
│   ├── helpers/           # Utilitaires (getToken, etc.)
│   └── hooks/             # Hooks personnalisés
├── src/
│   ├── components/        # Composants React réutilisables
│   │   ├── board/        # Composants du board (colonnes, cartes)
│   │   ├── modal/        # Modals (renommage, édition)
│   │   ├── toast/        # Système de notifications
│   │   └── ...
│   ├── routes/           # Pages/Routes de l'application
│   ├── helpers/          # Helpers côté composants
│   └── main.jsx          # Point d'entrée React
└── styles/               # Fichiers CSS
```

---

## Technologies

**Frontend**
- React 18 (avec Vite)
- React Router (navigation)
- Framer Motion (animations)

**Backend**
- Strapi (CMS headless - dépôt séparé)
- MySQL (base de données)

**Outils**
- Figma (maquettes)
- Postman (tests API)
- DrawDB (modélisation SQL)

---

## Installation

### Prérequis
- Node.js installé sur votre machine
- L'API Strapi configurée et lancée

### Étapes

1. **Cloner le dépôt**
```bash
git clone https://github.com/MasterAcnolo/1PRO2-Client
cd 1PRO2-Client
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:5173` (ou le port affiché dans le terminal).

---

## Fonctions Importantes

### Système de Toast (Notifications)

Afficher des notifications à l'utilisateur :

```javascript
import { showToast } from './components/toast/toast';

// Toast simple
showToast("Message", "success"); // success | error | info

// Toast avec persistance (survit aux redirections)
showToast("Connexion réussie", "success", true);
```

### Services API

Tous les services API se trouvent dans `script/services/` :

**Créer un élément**
```javascript
import { createElement } from './script/services/createElement';

await createElement("BOARD", { data: { name: "Mon Board" } });
await createElement("COLUMN", { data: { name: "À faire", board: boardId } });
await createElement("CARD", { data: { name: "Tâche", column: columnId } });
```

**Récupérer un élément**
```javascript
import { getElement } from './script/services/getElement';

const board = await getElement("BOARD", boardId);
```

**Modifier un élément**
```javascript
import { updateElement } from './script/services/updateElement';

await updateElement("CARD", cardId, { data: { name: "Nouveau nom" } });
```

**Supprimer un élément**
```javascript
import { deleteElement } from './script/services/deleteElement';

await deleteElement("COLUMN", columnId);
```

### Authentification

```javascript
import { loginRegisterUser, isLogged, disconnectUser } from './script/user';

// Connexion/Inscription
await loginRegisterUser(data, "login"); // ou "register"

// Vérifier si connecté
const logged = await isLogged();

// Déconnexion
disconnectUser();
```

---

## Fonctionnalités

### Gestion des Boards
- ✅ Créer, modifier, supprimer des boards
- ✅ Liste des boards avec date de dernière modification
- ✅ Navigation entre boards

### Gestion des Colonnes
- ✅ Créer des colonnes dans un board
- ✅ Renommer les colonnes
- ✅ Supprimer les colonnes

### Gestion des Cartes
- ✅ Créer des cartes dans une colonne
- ✅ Chaque carte a un nom, description et couleur
- ✅ 8 couleurs disponibles et personnalisables
- ✅ Édition complète des cartes (nom, description, couleur)
- ✅ Supprimer les cartes

### Authentification & Compte
- ✅ Inscription / Connexion
- ✅ Option "Rester connecté"
- ✅ Gestion du profil utilisateur
- ✅ Modification du mot de passe
- ✅ Suppression de compte

### Système de Notifications
- ✅ Toasts pour toutes les actions (succès/erreur/info)
- ✅ Notifications persistantes après redirection
- ✅ Auto-dismiss après 4 secondes

### Navigation & UX
- ✅ Animations de transition entre pages
- ✅ Redirections automatiques selon l'état de connexion
- ✅ Header avec état utilisateur
- ✅ Design responsive

---

## Scripts Disponibles

```bash
npm run dev          # Lancer en mode développement
npm run build        # Build pour la production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
```