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

const CARD_LABELS = {
    backlog: {
        id: "backlog",
        name: "Backlog",
        color: "#6B7280"
    },
    todo: {
        id: "todo",
        name: "À faire",
        color: "#3B82F6"
    },
    inProgress: {
        id: "inProgress",
        name: "En cours",
        color: "#F59E0B"
    },
    review: {
        id: "review",
        name: "En review",
        color: "#8B5CF6"
    },
    blocked: {
        id: "blocked",
        name: "Bloqué",
        color: "#EF4444"
    },
    done: {
        id: "done",
        name: "Terminé",
        color: "#10B981"
    },

    // Priorité
    lowPriority: {
        id: "lowPriority",
        name: "Priorité basse",
        color: "#9CA3AF"
    },
    mediumPriority: {
        id: "mediumPriority",
        name: "Priorité moyenne",
        color: "#FBBF24"
    },
    highPriority: {
        id: "highPriority",
        name: "Priorité haute",
        color: "#DC2626"
    },

    // Type
    feature: {
        id: "feature",
        name: "Feature",
        color: "#2563EB"
    },
    bug: {
        id: "bug",
        name: "Bug",
        color: "#B91C1C"
    },
    refactor: {
        id: "refactor",
        name: "Refactor",
        color: "#7C3AED"
    },
    docs: {
        id: "docs",
        name: "Documentation",
        color: "#059669"
    }
};

export {
    API_BASE_URL,
    CARD_COLORS,
    CARD_LABELS
}