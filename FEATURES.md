# Liste de toutes les features

## Utilisateur 

- Connexion / Inscription avec persistance du Token JWT dans le Session Storage ou dans un cookies de persistance 7d suivant si oui ou non on souhaite "Rester Connecté"
- Refus d'accès à une ressource si elle ne nous appartient pas
- Modification de mot de passe
- Suppression de compte (entraînant la supression des enfants associés)

## Board

- Création d'un board (Espace de travail) et accès via le documentID (/board/?ID)
- Suppression d'un board
- Renomage d'un board

- Header de Board (TODO)

- Export du Board en image (IMG 2 CANVAS) (BONUS) (TODO)


### Colonnes

- Création de colonne
- Suppression de colonne
- Réorganisation des colonnes (Drag N Drop) selon l'axe X

### Cartes (Tâches)
- Création de Cartes
    - Nom
    - Description
    - Date et/ou Heure (Falcultative)
    - Couleur (Selon une palette définie)
    - Labels
- Modification de Cartes
- Duplication de cartes
- Suppression de cartes
- Réorganisation des cartes (Drag N Drop) entre les colonnes et dans les colonnes même (TODO)


## Divers

- Notification lors d'action (Info, Succès, Erreur) avec persistance cross page
- Header, Menu Hamburger, Footer qui ont des variantes selon l'état de connexion


### Pages (TODO)

- Page 404 (TODO)
- Page 403 (Ou Notif) (TODO)