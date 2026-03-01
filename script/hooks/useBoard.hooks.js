// React
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// DND Kit
import { closestCenter } from '@dnd-kit/core';

// Helpers
import { 
    findCardWithParentColumn, 
    findColumnById, 
    removeCardPrefix, 
    getDraggedElementType,
    reorderColumns,
    reorderCardsInSameColumn,
    moveCardBetweenColumns 
} from "../helpers/dnd.helpers.js";

// Services
import { getElement } from "../services/getElement.services";
import { deleteElement } from "../services/deleteElement.services";
import { updateElement } from "../services/updateElement.services";
import { createElement } from "../services/createElement.services";

// Components
import { showToast } from "../../src/components/toast/toast";

const getId = (entity) => entity?.documentId || entity?.id;

export default function useBoard(boardId) {
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeCard, setActiveCard] = useState(null);

    // Fetch initial
    useEffect(() => {
        if (!boardId) { navigate("/board"); return; }

        getElement("BOARD", boardId)
            .then(res => {
                setBoard(res.data);
                document.title = `${res.data.title || "Board"} - Task Loader`;
            })
            .catch(err => {
                setError(err.message);
                if (err.message === "Board Not Found.") navigate("/n");
                else if (err.message === "You do not own this resource.") navigate("/f");
                else navigate("/u");
            })
            .finally(() => setLoading(false));
    }, [boardId, navigate]);

    async function refreshBoard() {
        const res = await getElement("BOARD", boardId);
        setBoard(res.data);
    }

    // CRUD Colonnes
    async function createColumn(name) {
        if (!name.trim()) return;
        await createElement("COLUMN", { data: { name, order: board.columns?.length || 0, board_id: boardId } });
        await refreshBoard();
        showToast("Colonne créée", "success");
    }

    async function deleteColumn(columnId) {
        await deleteElement("COLUMN", columnId);
        await refreshBoard();
        showToast("Colonne supprimée", "success");
    }

    // CRUD Cartes
    async function deleteCard(cardId) {
        await deleteElement("CARD", cardId);
        await refreshBoard();
        showToast("Carte supprimée", "success");
    }

    async function editCard(cardId, data) {
        await updateElement("CARD", cardId, { data });
        await refreshBoard();
        showToast("Carte modifiée", "success");
    }

    async function duplicateCard(cardId) {
        const { card, column } = findCardWithParentColumn(board, cardId);
        if (!card || !column) return;
        
        await createElement("CARD", {
            data: {
                name: card.name,
                description: card.description || null,
                deadline: card.deadline || null,
                color: card.color || null,
                order: column.cards?.length || 0,
                column: getId(column)
            }
        });
        await refreshBoard();
        showToast("Carte dupliquée", "success");
    }

    // Renommage
    async function rename(type, id, newName) {
        if (!id || !newName.trim()) return;
        await updateElement(type, id, { data: { name: newName } });
        await refreshBoard();
        showToast(`${type === "COLUMN" ? "Colonne" : "Carte"} renommée`, "success");
    }

    // DnD - Collision detection
    const customCollisionDetection = useCallback((args) => {
        const type = getDraggedElementType(String(args.active.id));
        if (type === 'column') {
            const cols = args.droppableContainers.filter(c => getDraggedElementType(String(c.id)) === 'column');
            return closestCenter({ ...args, droppableContainers: cols });
        }
        return closestCenter(args);
    }, []);

    function handleDragStart(e) {
        if (getDraggedElementType(String(e.active.id)) === 'card') {
            const { card } = findCardWithParentColumn(board, removeCardPrefix(String(e.active.id)));
            if (card) setActiveCard(card);
        }
    }

    function handleDragEnd(e) {
        setActiveCard(null);
        if (!e.over) return;

        const draggedId = String(e.active.id);
        const targetId = String(e.over.id);
        const draggedType = getDraggedElementType(draggedId);
        const targetType = getDraggedElementType(targetId);

        // Colonnes
        if (draggedType === 'column') {
            const cols = reorderColumns(board.columns, draggedId, targetId);
            if (cols) {
                setBoard({ ...board, columns: cols });
                cols.forEach(c => updateElement("COLUMN", c.documentId, { data: { order: c.order } }));
            }
            return;
        }

        // Cartes
        const cardId = removeCardPrefix(draggedId);
        const { column: srcCol } = findCardWithParentColumn(board, cardId);
        if (!srcCol) return;

        const srcColId = getId(srcCol);
        let destColId, insertAt;

        if (targetType === 'card') {
            const targetCardId = removeCardPrefix(targetId);
            const { column: destCol } = findCardWithParentColumn(board, targetCardId);
            if (!destCol) return;
            destColId = getId(destCol);
            insertAt = destCol.cards.findIndex(c => getId(c) === targetCardId);
        } else {
            destColId = removeCardPrefix(targetId);
            const destCol = findColumnById(board, destColId);
            if (!destCol) return;
            insertAt = destCol.cards?.length || 0;
        }

        // Même colonne
        if (srcColId === destColId && targetType === 'card') {
            const cols = reorderCardsInSameColumn(board.columns, srcColId, cardId, removeCardPrefix(targetId));
            if (cols) {
                setBoard({ ...board, columns: cols });
                cols.find(c => getId(c) === srcColId).cards.forEach(card => 
                    updateElement("CARD", getId(card), { data: { order: card.order } })
                );
            }
            return;
        }

        // Colonnes différentes
        if (srcColId !== destColId) {
            const result = moveCardBetweenColumns(board.columns, srcColId, destColId, cardId, insertAt);
            if (result) {
                setBoard({ ...board, columns: result.columns });
                updateElement("CARD", getId(result.movedCard), { data: { order: result.movedCard.order, column: destColId } });
                result.sourceColumnCards.forEach(c => updateElement("CARD", getId(c), { data: { order: c.order } }));
                result.destinationColumnCards.forEach(c => {
                    if (getId(c) !== getId(result.movedCard)) updateElement("CARD", getId(c), { data: { order: c.order } });
                });
            }
        }
    }

    function findCard(cardId) {
        return findCardWithParentColumn(board, cardId).card;
    }

    return {
        board, loading, error, activeCard,
        createColumn, deleteColumn,
        deleteCard, editCard, duplicateCard, findCard,
        rename, refreshBoard,
        customCollisionDetection, handleDragStart, handleDragEnd,
    };
}
