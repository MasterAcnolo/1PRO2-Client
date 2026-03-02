// React
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// DND Kit
import { closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Helpers
import { findCardWithParentColumn } from "../helpers/dnd.helpers.js";

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
                document.title = `Task Loader | ${res.data.name || "Board"}`;
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








    // Collision : si on drag une colonne, ignorer les cartes
    const collisionDetection = useCallback((args) => {
        if (args.active.data.current?.type === 'column') {
            const columnContainers = args.droppableContainers.filter(container => container.data.current?.type === 'column');
            return closestCenter({ ...args, droppableContainers: columnContainers });
        }
        return closestCenter(args);
    }, []);
    
    function handleDragStart({ active }) {
        if (active.data.current?.type === 'card') {
            setActiveCard(active.data.current.card);
        }
    }

    async function handleDragEnd({ active, over }) {
        setActiveCard(null);
        if (!over || active.id === over.id) return;

        const draggedItem = active.data.current;
        const targetItem = over.data.current;

        // DRAG DE COLONNE 
        if (draggedItem?.type === 'column') {
            const fromIndex = board.columns.findIndex(col => getId(col) === active.id);
            const toIndex = board.columns.findIndex(col => getId(col) === over.id);
            
            if (fromIndex !== -1 && toIndex !== -1) {
                const reorderedColumns = arrayMove(board.columns, fromIndex, toIndex)
                    .map((col, index) => ({ ...col, order: index }));
                
                setBoard({ ...board, columns: reorderedColumns });
                reorderedColumns.forEach(col => updateElement("COLUMN", getId(col), { data: { order: col.order } }));
            }
            return;
        }

        // DRAG DE CARTE
        const draggedCardId = getId(draggedItem?.card);
        const sourceColumnId = draggedItem?.columnId;
        const destinationColumnId = targetItem?.columnId || String(over.id);
        
        if (!draggedCardId || !sourceColumnId) return;

        const sourceColumn = board.columns.find(col => getId(col) === sourceColumnId);
        const destinationColumn = board.columns.find(col => getId(col) === destinationColumnId);
        if (!sourceColumn || !destinationColumn) return;

        // Même colonne = réordonner
        if (sourceColumnId === destinationColumnId) {
            const fromIndex = sourceColumn.cards.findIndex(card => getId(card) === draggedCardId);
            const toIndex = targetItem?.type === 'card' 
                ? sourceColumn.cards.findIndex(card => getId(card) === getId(targetItem.card))
                : sourceColumn.cards.length;
            
            if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
                const reorderedCards = arrayMove(sourceColumn.cards, fromIndex, toIndex)
                    .map((card, index) => ({ ...card, order: index }));
                
                const updatedColumns = board.columns.map(col => 
                    getId(col) === sourceColumnId ? { ...col, cards: reorderedCards } : col
                );
                
                setBoard({ ...board, columns: updatedColumns });
                reorderedCards.forEach(card => updateElement("CARD", getId(card), { data: { order: card.order } }));
            }
            return;
        }

        // Colonnes différentes = déplacer
        const cardToMove = sourceColumn.cards.find(card => getId(card) === draggedCardId);
        const insertAtIndex = targetItem?.type === 'card'
            ? destinationColumn.cards.findIndex(card => getId(card) === getId(targetItem.card))
            : destinationColumn.cards.length;

        // Retirer de la source
        const updatedSourceCards = sourceColumn.cards
            .filter(card => getId(card) !== draggedCardId)
            .map((card, index) => ({ ...card, order: index }));

        // Ajouter à la destination
        const destinationCards = [...destinationColumn.cards];
        destinationCards.splice(insertAtIndex, 0, { ...cardToMove, order: insertAtIndex });
        const updatedDestinationCards = destinationCards.map((card, index) => ({ ...card, order: index }));

        const updatedColumns = board.columns.map(col => {
            if (getId(col) === sourceColumnId) return { ...col, cards: updatedSourceCards };
            if (getId(col) === destinationColumnId) return { ...col, cards: updatedDestinationCards };
            return col;
        });

        setBoard({ ...board, columns: updatedColumns });
        
        // Sync API
        await updateElement("CARD", draggedCardId, { data: { order: insertAtIndex, column: destinationColumnId } });
        updatedSourceCards.forEach(card => updateElement("CARD", getId(card), { data: { order: card.order } }));
        updatedDestinationCards.forEach(card => {
            if (getId(card) !== draggedCardId) updateElement("CARD", getId(card), { data: { order: card.order } });
        });
    }

    function findCard(cardId) {
        return findCardWithParentColumn(board, cardId).card;
    }

    return {
        board, loading, error, activeCard,
        createColumn, deleteColumn,
        deleteCard, editCard, duplicateCard, findCard,
        rename, refreshBoard,
        collisionDetection, handleDragStart, handleDragEnd,
    };
}
