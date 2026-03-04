# Task Loader

Application de gestion de tâches Kanban construite avec React 19 et Vite.

> Le backend Strapi se trouve dans un dépôt séparé.

---

## Stack Technique

| Frontend | Backend | Outils |
|----------|---------|--------|
| React 19 | Strapi v5 | Figma |
| Vite 7 | MySQL | Postman |
| DND Kit | JWT Auth | DrawDB |
| Framer Motion | | html2canvas |

---

## Structure du Projet

```
script/
  helpers/         # Utilitaires (token, dnd)
  hooks/           # Hooks custom (useBoard, isLogged)
  services/        # API CRUD (get, create, update, delete)
  
src/
  components/      # Composants React
    board/         # Colonnes et cartes
    modal/         # Modales (rename, edit card)
    dropdown/      # Menu contextuel
    toast/         # Notifications
  routes/          # Pages de l'application

styles/            # CSS global et par page
assets/            # Icônes et images
```

---

## Installation

```bash
git clone https://github.com/MasterAcnolo/1PRO2-Client
cd 1PRO2-Client
npm install
npm run dev
```

---

## Fonctionnalites

### Utilisateur 

- Connexion / Inscription avec persistance du Token JWT dans le Session Storage ou dans un cookies de persistance 7d suivant si oui ou non on souhaite "Rester Connecter"
- Refus d'acces a une ressource si elle ne nous appartient pas
- Modification de mot de passe
- Suppression de compte (entrainant la suppression des enfants associes)
- Deconnexion

### Board

- Creation d'un board (Espace de travail) et acces via le documentID (/board/?ID)
- Suppression d'un board
- Renomage d'un board
- Header de Board avec nom du board et bouton d'export
- Export du Board en image (HTML2CANVAS)

### Colonnes

- Creation de colonne
- Suppression de colonne
- Renomage de colonne
- Reorganisation des colonnes (Drag N Drop) selon l'axe X

### Cartes (Taches)

- Creation de Cartes
    - Nom
    - Description
    - Date et/ou Heure (Facultative)
    - Couleur (Selon une palette definie)
    - Labels
- Modification de Cartes
- Duplication de cartes
- Suppression de cartes
- Reorganisation des cartes (Drag N Drop) entre les colonnes et dans les colonnes meme

### Divers

- Notification lors d'action (Info, Succes, Erreur) avec persistance cross page
- Header, Menu Hamburger, Footer qui ont des variantes selon l'etat de connexion
- Scroll to Top automatique lors d'un changement de page
- Dropdown contextuel pour actions rapides (supprimer, renommer, editer, dupliquer)

### Pages

- Page d'Accueil (Presentation du produit et fonctionnalites)
- Mes Boards (Liste des boards de l'utilisateur)
- Board (Vue Kanban avec colonnes et cartes)
- Connexion
- Inscription
- Mon Compte (Modification mot de passe, suppression compte)
- Contact
- Mentions Legales
- Vos Donnees
- Plan du Site
- Page 404 (Page introuvable)
- Page 403 (Acces refuse)
- Page Erreur Inconnue

---

## API Services

```javascript
// Services disponibles dans script/services/
import { createElement } from './services/createElement.services';
import { getElement } from './services/getElement.services';
import { updateElement } from './services/updateElement.services';
import { deleteElement } from './services/deleteElement.services';

// Types: "BOARD", "COLUMN", "CARD"
await createElement("BOARD", { data: { name: "Mon Board" } });
await getElement("BOARD", boardId);
await updateElement("CARD", cardId, { data: { name: "Nouveau nom" } });
await deleteElement("COLUMN", columnId);
```

---

## Scripts

```bash
npm run dev      # Developpement
npm run build    # Production
npm run preview  # Preview du build
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/login` | Connexion |
| `/register` | Inscription |
| `/account` | Mon compte |
| `/board` | Liste des boards |
| `/board/:id` | Vue Kanban |
| `/contact` | Contact |
| `/mentions-legales` | Mentions legales |
| `/vos-donnees` | Vos donnees |
| `/plan-du-site` | Plan du site |
| `/403` | 403 - Acces refuse |
| `/404` | 404 - Page introuvable |
| `/unknown` | Erreur inconnue |