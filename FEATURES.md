# Liste de toutes les features

## Utilisateur 

- Connexion / Inscription avec persistance du Token JWT dans le Session Storage ou dans un cookies de persistance 7d suivant si oui ou non on souhaite "Rester Connecté"
- Refus d'accès à une ressource si elle ne nous appartient pas
- Modification de mot de passe
- Suppression de compte (entraînant la suppression des enfants associés)
- Déconnexion

## Board

- Création d'un board (Espace de travail) et accès via le documentID (/board/?ID)
- Suppression d'un board
- Renomage d'un board
- Header de Board avec nom du board et bouton d'export
- Export du Board en image (HTML2CANVAS)


### Colonnes

- Création de colonne
- Suppression de colonne
- Renomage de colonne
- Réorganisation des colonnes (Drag N Drop) selon l'axe X

### Cartes (Tâches)

- Création de Cartes
    - Nom
    - Description
    - Date et/ou Heure (Facultative)
    - Couleur (Selon une palette définie)
    - Labels
- Modification de Cartes
- Duplication de cartes
- Suppression de cartes
- Réorganisation des cartes (Drag N Drop) entre les colonnes et dans les colonnes même


## Divers

- Notification lors d'action (Info, Succès, Erreur) avec persistance cross page
- Header, Menu Hamburger, Footer qui ont des variantes selon l'état de connexion
- Scroll to Top automatique lors d'un changement de page
- Dropdown contextuel pour actions rapides (supprimer, renommer, éditer, dupliquer)


## Pages

- Page d'Accueil (Présentation du produit et fonctionnalités)
- Mes Boards (Liste des boards de l'utilisateur)
- Board (Vue Kanban avec colonnes et cartes)
- Connexion
- Inscription
- Mon Compte (Modification mot de passe, suppression compte)
- Contact
- Mentions Légales
- Plan du Site
- Page 404 (Page introuvable)
- Page 403 (Accès refusé)
- Page Erreur Inconnue


> Et plein de petits détails qui rendent le projet plus gros