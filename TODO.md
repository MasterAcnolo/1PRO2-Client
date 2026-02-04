# TODO - Task Loader

## Fait

**Authentification**
- Inscription / Connexion
- Gestion des tokens (cookie + session)
- Déconnexion
- Redirection après login
- Si Authentifié, on passe peut pas accéder à /login et /register


**Boards**
- Liste des boards
- Création de board
- Suppression de board
- Navigation vers un board

**Architecture**
- Structure projet propre
- Services API abstraits
- React Router configuré

---

## À faire

**Colonnes - PRIORITÉ 1**
- Affichage des colonnes (board.jsx et column.jsx sont vides)
- Création de colonnes
- Suppression de colonnes
- Renommage de colonnes

**Cartes - PRIORITÉ 2**
- Création de cartes
- Affichage des cartes
- Édition de carte (titre, description, date, labels)
- Suppression de carte
- Intégrer le composant TaskCard existant

**Drag & Drop - PRIORITÉ 3**
- Intégrer @dnd-kit (installé mais pas utilisé)
- Déplacement entre colonnes
- Réorganisation dans une colonne
- Persistence en base de données
- Rollback si erreur API

**UX/Feedback**
- Système de toast (dossier vide)
- Notifications succès/erreur
- Loader global
- Messages "liste vide"

**Modales**
- Modale d'édition de carte
- Modale d'édition de colonne
- Rendre réutilisable l'overlay de création

**Responsive**
- Scroll horizontal colonnes sur mobile
- Media queries pour le board
- Tailles tactiles

**Documentation**
- Schéma BDD Strapi
- Guide installation backend
- Variables .env documentées
- Justification choix techniques

**Bugs**

Le code est trop parfait, ya pas de bugs (fo)