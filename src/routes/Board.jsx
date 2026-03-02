// React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// DND Kit
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// CSS
import "../../styles/pages/board.css";
import "../../styles/overlay/createBoard.css";

// Hooks
import { useUserIsLoggedRedirect } from "../../script/hooks/isLogged.hooks.js";
import useBoard from "../../script/hooks/useBoard.hooks.js";

// Utils
import exportBoardAsImage from "../../script/utils/export.utils.js";

// Components
import Column from "../components/board/column/column";
import TaskCard from "../components/board/card/card";
import RenameModal from "../components/modal/RenameModal";
import CardModal from "../components/modal/CardModal.jsx";
import Loader, { ButtonSpinner } from "../components/loader/Loader";

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

    // Titre de la page
    useEffect(() => {
        if (board?.name) document.title = `Task Loader | ${board.name}`;
    }, [board?.name]);

    // Modales state
    const [renameModal, setRenameModal] = useState({ open: false, type: null, id: null, name: "" });
    const [createColumnModal, setCreateColumnModal] = useState({ open: false, name: "", loading: false });
    const [editCardModal, setEditCardModal] = useState({ open: false, id: null, data: null });
    const [isRenaming, setIsRenaming] = useState(false);

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
        await editCard(editCardModal.id, updatedData);
        closeEditCardModal();
    }

    async function handleCreateColumn() {
        setCreateColumnModal(prev => ({ ...prev, loading: true }));
        try {
            await createColumn(createColumnModal.name);
            setCreateColumnModal({ open: false, name: "", loading: false });
        } catch {
            setCreateColumnModal(prev => ({ ...prev, loading: false }));
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
                    <span className="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="export-icon">
                            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                        <span className="export-tray"></span>
                    </span>
                    <span className="export-text">Exporter</span>
                </button>
            </div>

            <div className="board-container">
                <DndContext 
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd} 
                    collisionDetection={collisionDetection}
                >
                    <SortableContext
                        items={board.columns.map(c => c.documentId)}
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
                            <div className="newColumn" onClick={() => setCreateColumnModal({ open: true, name: "" })}>
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

                {/* Modale création colonne */}
                {createColumnModal.open && (
                    <div className="createBoard-overlay" onClick={() => !createColumnModal.loading && setCreateColumnModal({ open: false, name: "", loading: false })}>
                        <div className="createBoard" onClick={(e) => e.stopPropagation()}>
                            <h3>Création de Colonne</h3>
                            <input 
                                type="text" 
                                placeholder="Nom de la colonne" 
                                value={createColumnModal.name}
                                onChange={(e) => setCreateColumnModal({ ...createColumnModal, name: e.target.value })}
                                disabled={createColumnModal.loading}
                                autoFocus
                            />
                            <div className="buttons">
                                <button onClick={() => setCreateColumnModal({ open: false, name: "", loading: false })} disabled={createColumnModal.loading}>Annuler</button>
                                <button onClick={handleCreateColumn} disabled={createColumnModal.loading} className={createColumnModal.loading ? 'loading' : ''}>
                                    {createColumnModal.loading && <ButtonSpinner />}
                                    {createColumnModal.loading ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                />
            </div>
        </>
    );
}
