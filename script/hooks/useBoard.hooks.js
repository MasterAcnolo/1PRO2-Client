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
                labels: card.labels || null,
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





    // DRAG & DROP - Fonctions utilitaires

    // Réordonne une liste et met à jour les index "order"
    function reorder(list, fromIndex, toIndex) {
        return arrayMove(list, fromIndex, toIndex).map((item, i) => ({ ...item, order: i }));
    }

    // Met à jour une colonne spécifique dans le board
    function updateColumnInBoard(columnId, newCards) {
        return board.columns.map(col => 
            getId(col) === columnId ? { ...col, cards: newCards } : col
        );
    }

    // Sauvegarde les ordres en base de données
    function saveOrders(type, items) {
        items.forEach(item => updateElement(type, getId(item), { data: { order: item.order } }));
    }

    // DRAG & DROP - Handlers principaux

    // Ignore les cartes quand on drag une colonne
    const collisionDetection = useCallback((args) => {
        if (args.active.data.current?.type === 'column') {
            const onlyColumns = args.droppableContainers.filter(c => c.data.current?.type === 'column');
            return closestCenter({ ...args, droppableContainers: onlyColumns });
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

        const dragged = active.data.current;
        const target = over.data.current;

        // Drag de colonne
        if (dragged?.type === 'column') {
            await handleColumnDrag(active.id, over.id);
            return;
        }

        // Drag de carte
        await handleCardDrag(dragged, target, over.id);
    }

    // DRAG & DROP

    async function handleColumnDrag(fromId, toId) {
        // Trier par order d'abord pour que les index correspondent à l'affichage
        const sortedColumns = [...board.columns].sort((a, b) => a.order - b.order);
        
        const fromIndex = sortedColumns.findIndex(col => getId(col) === fromId);
        const toIndex = sortedColumns.findIndex(col => getId(col) === toId);

        if (fromIndex === -1 || toIndex === -1) return;

        const newColumns = reorder(sortedColumns, fromIndex, toIndex);
        setBoard({ ...board, columns: newColumns });
        saveOrders("COLUMN", newColumns);
    }

    async function handleCardDrag(dragged, target, overId) {
        const cardId = getId(dragged?.card);
        const fromColId = dragged?.columnId;
        const toColId = target?.columnId || String(overId);

        if (!cardId || !fromColId) return;

        const fromCol = board.columns.find(col => getId(col) === fromColId);
        const toCol = board.columns.find(col => getId(col) === toColId);
        if (!fromCol || !toCol) return;

        // Même colonne -> réordonner
        if (fromColId === toColId) {
            await reorderCardInColumn(fromCol, cardId, target);
        } 
        // Colonnes différentes -> déplacer
        else {
            await moveCardToColumn(fromCol, toCol, cardId, target);
        }
    }

    async function reorderCardInColumn(column, cardId, target) {
        const fromIndex = column.cards.findIndex(c => getId(c) === cardId);
        const toIndex = target?.type === 'card'
            ? column.cards.findIndex(c => getId(c) === getId(target.card))
            : column.cards.length;

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

        const newCards = reorder(column.cards, fromIndex, toIndex);
        setBoard({ ...board, columns: updateColumnInBoard(getId(column), newCards) });
        saveOrders("CARD", newCards);
    }

    async function moveCardToColumn(fromCol, toCol, cardId, target) {
        const card = fromCol.cards.find(c => getId(c) === cardId);
        const insertAt = target?.type === 'card'
            ? toCol.cards.findIndex(c => getId(c) === getId(target.card))
            : toCol.cards.length;

        // Retirer de la source
        const newFromCards = fromCol.cards
            .filter(c => getId(c) !== cardId)
            .map((c, i) => ({ ...c, order: i }));

        // Ajouter à la destination
        const newToCards = [...toCol.cards];
        newToCards.splice(insertAt, 0, { ...card, order: insertAt });
        const orderedToCards = newToCards.map((c, i) => ({ ...c, order: i }));

        // Mise à jour locale
        const newColumns = board.columns.map(col => {
            if (getId(col) === getId(fromCol)) return { ...col, cards: newFromCards };
            if (getId(col) === getId(toCol)) return { ...col, cards: orderedToCards };
            return col;
        });
        setBoard({ ...board, columns: newColumns });

        // Sync API
        await updateElement("CARD", cardId, { data: { order: insertAt, column: getId(toCol) } });
        saveOrders("CARD", newFromCards);
        orderedToCards.filter(c => getId(c) !== cardId).forEach(c => 
            updateElement("CARD", getId(c), { data: { order: c.order } })
        );
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
