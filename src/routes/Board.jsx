// React
import { useState } from "react";
import { useParams } from "react-router-dom";

// DND Kit
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// CSS
import "../../styles/pages/board.css";

// Hooks
import { useUserIsLoggedRedirect } from "../../script/hooks/isLogged.hooks.js";
import useBoard from "../../script/hooks/useBoard.hooks.js";

// Utils
import exportBoardAsImage from "../../script/utils/export.utils.js";

// Components
import Column from "../components/board/column/column";
import TaskCard from "../components/board/card/card";
import RenameModal from "../components/modal/RenameModal";
import CreateModal from "../components/modal/CreateModal";
import CardModal from "../components/modal/CardModal.jsx";
import Loader from "../components/loader/Loader";

export default function Board() {
    useUserIsLoggedRedirect('/login');

    const { id } = useParams();
    
    const {
        board, loading, error, activeCard,
        createColumn, deleteColumn,
        deleteCard, editCard, duplicateCard, findCard,
        rename, refreshBoard,
        collisionDetection, handleDragStart, handleDragEnd,
    } = useBoard(id);

    // Modales state
    const [renameModal, setRenameModal] = useState({ open: false, type: null, id: null, name: "" });
    const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
    const [isCreatingColumn, setIsCreatingColumn] = useState(false);
    const [editCardModal, setEditCardModal] = useState({ open: false, id: null, data: null });
    const [isRenaming, setIsRenaming] = useState(false);
    const [isEditingCard, setIsEditingCard] = useState(false);

    // Handlers modales
    function openRenameModal(type, id, name) {
        setRenameModal({ open: true, type, id, name });
    }

    function closeRenameModal() {
        setRenameModal({ open: false, type: null, id: null, name: "" });
    }

    async function handleRename(newName) {
        setIsRenaming(true);
        try {
            await rename(renameModal.type, renameModal.id, newName);
            closeRenameModal();
        } finally {
            setIsRenaming(false);
        }
    }

    function openEditCardModal(cardId) {
        const card = findCard(cardId);
        if (card) setEditCardModal({ open: true, id: cardId, data: card });
    }

    function closeEditCardModal() {
        setEditCardModal({ open: false, id: null, data: null });
    }

    async function handleEditCard(updatedData) {
        setIsEditingCard(true);
        try {
            await editCard(editCardModal.id, updatedData);
            closeEditCardModal();
        } finally {
            setIsEditingCard(false);
        }
    }

    async function handleCreateColumn(name) {
        setIsCreatingColumn(true);
        try {
            await createColumn(name);
            setIsCreateColumnOpen(false);
        } finally {
            setIsCreatingColumn(false);
        }
    }

    if (loading) return <Loader fullPage text="Chargement du board..." />;
    if (error) return <p>Erreur : {error}</p>;
    if (!board) return <p>Board introuvable</p>;

    return (
        <>
            <div className="board-header">
                <h1>{board.name}</h1>
                <button id="export-board" className="export-btn" onClick={() => exportBoardAsImage(board?.name || "board")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="export-icon">
                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                    </svg>
                    Exporter
                </button>
            </div>

            <div className="board-container">
                <DndContext 
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd} 
                    collisionDetection={collisionDetection}
                >
                    <SortableContext
                        items={board.columns
                            .slice()
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map(c => c.documentId)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <div className="columns-container" id="columns-container">
                            {board.columns
                                .slice()
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map(column => (
                                    <Column
                                        key={column.documentId}
                                        columnData={column}
                                        onDelete={deleteColumn}
                                        onRename={(id, name) => openRenameModal("COLUMN", id, name)}
                                        onCardDelete={deleteCard}
                                        onCardRename={(id, name) => openRenameModal("CARD", id, name)}
                                        onCardEdit={openEditCardModal}
                                        onCardDuplicate={duplicateCard}
                                        onRefresh={refreshBoard}
                                    />
                                ))}
                            <div className="newColumn no-export" onClick={() => setIsCreateColumnOpen(true)}>
                                <h3>+ Nouvelle Colonne</h3>
                            </div>
                        </div>
                    </SortableContext>
                    
                    <DragOverlay>
                        {activeCard ? (
                            <div className="drag-overlay-card">
                                <TaskCard cardData={activeCard} />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                <CreateModal
                    isOpen={isCreateColumnOpen}
                    onClose={() => setIsCreateColumnOpen(false)}
                    onSubmit={handleCreateColumn}
                    title="Création de Colonne"
                    placeholder="Nom de la colonne"
                    submitLabel="Créer"
                    isLoading={isCreatingColumn}
                />

                <RenameModal 
                    isOpen={renameModal.open}
                    onClose={closeRenameModal}
                    onRename={handleRename}
                    currentName={renameModal.name}
                    type={renameModal.type}
                    isLoading={isRenaming}
                />

                <CardModal 
                    isOpen={editCardModal.open}
                    onClose={closeEditCardModal}
                    onSubmit={handleEditCard}
                    cardData={editCardModal.data}
                    mode="edit"
                    isLoading={isEditingCard}
                />
            </div>
        </>
    );
}
