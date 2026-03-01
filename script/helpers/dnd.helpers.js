import { arrayMove } from '@dnd-kit/sortable';

// Strapi utilise documentId ou id selon le contexte
const getId = (entity) => entity?.documentId || entity?.id;

// Trouve une carte et sa colonne parente
export function findCardWithParentColumn(board, cardId) {
    for (const column of board.columns) {
        const card = column.cards?.find(c => getId(c) === cardId);
        if (card) return { card, column };
    }
    return { card: null, column: null };
}

// Trouve une colonne par son ID
export function findColumnById(board, columnId) {
    return board.columns.find(col => getId(col) === columnId);
}

// Extrait l'ID sans le préfixe "card-"
export function removeCardPrefix(dndId) {
    return dndId.startsWith('card-') ? dndId.slice(5) : dndId;
}

// Détermine si c'est une carte ou une colonne
export function getDraggedElementType(dndId) {
    return dndId.startsWith('card-') ? 'card' : 'column';
}

// Réordonne les colonnes
export function reorderColumns(columns, draggedId, targetId) {
    const from = columns.findIndex(c => c.documentId === draggedId);
    const to = columns.findIndex(c => c.documentId === targetId);
    
    if (from === -1 || to === -1 || from === to) return null;
    
    return arrayMove(columns, from, to).map((col, i) => ({ ...col, order: i }));
}

// Réordonne les cartes dans une colonne
export function reorderCardsInSameColumn(columns, columnId, draggedCardId, targetCardId) {
    const colIdx = columns.findIndex(c => getId(c) === columnId);
    if (colIdx === -1) return null;
    
    const cards = columns[colIdx].cards;
    const from = cards.findIndex(c => getId(c) === draggedCardId);
    const to = cards.findIndex(c => getId(c) === targetCardId);
    
    if (from === -1 || to === -1 || from === to) return null;
    
    const newCards = arrayMove(cards, from, to).map((card, i) => ({ ...card, order: i }));
    return columns.map((col, i) => i === colIdx ? { ...col, cards: newCards } : col);
}

// Déplace une carte entre colonnes
export function moveCardBetweenColumns(columns, fromColId, toColId, cardId, insertAt) {
    const srcCol = columns.find(c => getId(c) === fromColId);
    const destCol = columns.find(c => getId(c) === toColId);
    if (!srcCol || !destCol) return null;
    
    const cardIdx = srcCol.cards.findIndex(c => getId(c) === cardId);
    if (cardIdx === -1) return null;
    
    // Créer les nouvelles listes de cartes
    const movedCard = { ...srcCol.cards[cardIdx], column: toColId };
    const srcCards = srcCol.cards.filter((_, i) => i !== cardIdx).map((c, i) => ({ ...c, order: i }));
    
    const destCards = [...destCol.cards];
    destCards.splice(insertAt >= 0 ? insertAt : destCards.length, 0, movedCard);
    const destCardsWithOrder = destCards.map((c, i) => ({ ...c, order: i }));
    
    const newColumns = columns.map(col => {
        if (getId(col) === fromColId) return { ...col, cards: srcCards };
        if (getId(col) === toColId) return { ...col, cards: destCardsWithOrder };
        return col;
    });
    
    return {
        columns: newColumns,
        movedCard: destCardsWithOrder.find(c => getId(c) === cardId),
        sourceColumnCards: srcCards,
        destinationColumnCards: destCardsWithOrder
    };
}
