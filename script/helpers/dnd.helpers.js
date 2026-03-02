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
