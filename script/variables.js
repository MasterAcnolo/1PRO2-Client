// Variables de fonctionnement
const API_BASE_URL = "http://192.168.1.53:1337/api"; // Actuellement mon IP chez moi. Remplacer par LocalHost quand on est en présentiel.

// Variables de fonctionnalités
const CARD_COLORS = [
    { name: 'Aucune', value: null },
    { name: 'Rouge', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Jaune', value: '#eab308' },
    { name: 'Vert', value: '#22c55e' },
    { name: 'Bleu', value: '#3b82f6' },
    { name: 'Violet', value: '#a855f7' },
    { name: 'Rose', value: '#ec4899' },
];



export {
    API_BASE_URL,
    CARD_COLORS
}