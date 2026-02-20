// React
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// CSS
import "../../styles/pages/board.css";
import "../../styles/overlay/createBoard.css";

// Helpers
import { useUserIsLoggedRedirect } from "../../script/hooks/isLogged.hooks.js";

// Components
import { showToast } from "../components/toast/toast";
import Column from "../components/board/column/column";
import RenameModal from "../components/modal/RenameModal";
import EditCardModal from "../components/modal/EditCardModal";

// Services
import { getElement } from "../../script/services/getElement.services";
import { deleteElement } from "../../script/services/deleteElement.services";
import { updateElement } from "../../script/services/updateElement.services";
import { createElement } from "../../script/services/createElement.services";

export default function Board() {

    useUserIsLoggedRedirect('/login');

    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [renameType, setRenameType] = useState(null);
    const [renamingId, setRenamingId] = useState(null);
    const [renamingName, setRenamingName] = useState("");
    
    const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    
    const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
    const [editingCardId, setEditingCardId] = useState(null);
    const [editingCardData, setEditingCardData] = useState(null);

    useEffect(() => {
        if (!id) {
            navigate("/board");
            return;
        }

        async function fetchBoard() {
            try {
                const res = await getElement("BOARD", id);
                setBoard(res.data);
                document.title = res.data.title ? `${res.data.title} - Task Loader` : "Board - Task Loader";
            } catch (err) {
                // Gestion spécifique du 404
                if (err.response && err.response.status === 404) {
                    setError("Board introuvable.");
                    showToast("Board introuvable", "error");
                } else {
                    setError(err.message);
                    showToast("Erreur lors du chargement du board", "error");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchBoard();
    }, [id, navigate]);

    async function refreshBoard() {
        try {
            const res = await getElement("BOARD", id);
            setBoard(res.data);
        } catch (err) {
            console.error("Erreur lors du rafraîchissement:", err);
        }
    }

    // Gestion des colonnes
    async function handleDeleteColumn(columnId) {
        try {
            await deleteElement("COLUMN", columnId);
            await refreshBoard();
            showToast("Colonne supprimée", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            showToast("Erreur lors de la suppression de la colonne", "error");
        }
    }

    function openRenameColumnModal(columnId, currentName) {
        setRenameType("COLUMN");
        setRenamingId(columnId);
        setRenamingName(currentName);
        setIsRenameModalOpen(true);
    }

    // Gestion des cards
    async function handleDeleteCard(cardId) {
        try {
            await deleteElement("CARD", cardId);
            await refreshBoard();
            showToast("Carte supprimée", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            showToast("Erreur lors de la suppression de la carte", "error");
        }
    }

    function openRenameCardModal(cardId, currentName) {
        setRenameType("CARD");
        setRenamingId(cardId);
        setRenamingName(currentName);
        setIsRenameModalOpen(true);
    }

    // Gestion de l'édition complète des cartes
    function openEditCardModal(cardId) {
        // Trouver les données de la carte dans le board
        let cardData = null;
        if (board.columns) {
            for (const column of board.columns) {
                if (column.cards) {
                    cardData = column.cards.find(card => 
                        (card.documentId || card.id) === cardId
                    );
                    if (cardData) break;
                }
            }
        }
        
        if (cardData) {
            setEditingCardId(cardId);
            setEditingCardData(cardData);
            setIsEditCardModalOpen(true);
        }
    }

    function closeEditCardModal() {
        setIsEditCardModalOpen(false);
        setEditingCardId(null);
        setEditingCardData(null);
    }

    async function handleEditCard(updatedData) {
        if (!editingCardId) return;
        
        try {
            const payload = { data: updatedData };
            await updateElement("CARD", editingCardId, payload);
            await refreshBoard();
            showToast("Carte modifiée avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            showToast("Erreur lors de la modification de la carte", "error");
        }
    }

    // Gestion de la duplication de cartes
    async function handleDuplicateCard(cardId) {
        try {
            // Trouver la carte et sa colonne
            let cardData = null;
            let columnId = null;
            
            if (board.columns) {
                for (const column of board.columns) {
                    if (column.cards) {
                        cardData = column.cards.find(card => 
                            (card.documentId || card.id) === cardId
                        );
                        if (cardData) {
                            columnId = column.documentId || column.id;
                            break;
                        }
                    }
                }
            }
            
            if (cardData && columnId) {
                // Calculer le nouvel ordre
                const columnCards = board.columns
                    .find(col => (col.documentId || col.id) === columnId)
                    ?.cards || [];
                const order = columnCards.length;
                
                const payload = {
                    data: {
                        name: cardData.name,
                        description: cardData.description || null,
                        deadline: cardData.deadline || null,
                        color: cardData.color || null,
                        order: order,
                        column: columnId
                    }
                };
                
                await createElement("CARD", payload);
                await refreshBoard();
                showToast("Carte dupliquée avec succès", "success");
            }
        } catch (error) {
            console.error("Erreur lors de la duplication:", error);
            showToast("Erreur lors de la duplication de la carte", "error");
        }
    }

    function closeRenameModal() {
        setIsRenameModalOpen(false);
        setRenameType(null);
        setRenamingId(null);
        setRenamingName("");
    }

    async function handleRename(newName) {
        if (!renamingId || newName.trim() === "") return;
        
        try {
            const payload = { data: { name: newName } };
                
            await updateElement(renameType, renamingId, payload);
            await refreshBoard();
            closeRenameModal();
            const itemType = renameType === "COLUMN" ? "Colonne" : "Carte";
            showToast(`${itemType} renommée avec succès`, "success");
        } catch (error) {
            console.error("Erreur lors du renommage:", error);
            showToast("Erreur lors du renommage", "error");
        }
    }

    // Gestion de la création de colonnes
    function openCreateColumnModal() {
        setIsCreateColumnModalOpen(true);
    }

    function closeCreateColumnModal() {
        setIsCreateColumnModalOpen(false);
        setNewColumnName("");
    }

    async function handleCreateColumn() {
        if (newColumnName.trim() === "") return;
        
        try {
            // Calculer l'ordre automatiquement (ordre = nombre de colonnes existantes)
            const order = board.columns ? board.columns.length : 0;
            
            const payload = { 
                data: { 
                    name: newColumnName,
                    order: order,
                    board_id: id  // Association au board parent
                } 
            };
            
            await createElement("COLUMN", payload);
            await refreshBoard();
            closeCreateColumnModal();
            showToast("Colonne créée avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            showToast("Erreur lors de la création de la colonne", "error");
        }
    }

    if (loading) return <p>Chargement…</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!board) return <p>Board introuvable</p>;

    document.title = `Task Loader | ${board.name}`

    return (
        <>
            <div className="board-container">
                <h1>{board.name}</h1>
                
                <div className="columns-container">
                    {/* Colonnes existantes */}
                    {board.columns && board.columns.length > 0 ? (
                        board.columns
                            .slice()  // Copie du tableau pour ne pas modifier l'original
                            .sort((a, b) => {
                                const orderA = a.order || 0;
                                const orderB = b.order || 0;
                                return orderA - orderB;  // Tri croissant par ordre
                            })
                            .map(column => (
                                <Column 
                                    key={column.id} 
                                    columnData={column}
                                    onDelete={handleDeleteColumn}
                                    onRename={openRenameColumnModal}
                                    onCardDelete={handleDeleteCard}
                                    onCardRename={openRenameCardModal}
                                    onCardEdit={openEditCardModal}
                                    onCardDuplicate={handleDuplicateCard}
                                    onRefresh={refreshBoard}
                                />
                            ))
                    ) : null}
                    
                    {/* Bouton Add Column */}
                    <div className='newColumn' onClick={openCreateColumnModal}>
                        <h3>+ Nouvelle Colonne</h3>
                    </div>
                </div>

                {/* Modale de création de colonne */}
                {isCreateColumnModalOpen && (
                    <div className="createBoard-overlay" onClick={closeCreateColumnModal}>
                        <div className="createBoard" onClick={(e) => e.stopPropagation()}>
                            <h3>Création de Colonne</h3>
                            <input 
                                type="text" 
                                placeholder="Nom de la colonne" 
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                                autoFocus
                            />
                            <div className="buttons">
                                <button onClick={closeCreateColumnModal}>Annuler</button>
                                <button onClick={handleCreateColumn}>Créer</button>
                            </div>
                        </div>
                    </div>
                )}

                <RenameModal 
                    isOpen={isRenameModalOpen}
                    onClose={closeRenameModal}
                    onRename={handleRename}
                    currentName={renamingName}
                    type={renameType}
                />

                <EditCardModal 
                    isOpen={isEditCardModalOpen}
                    onClose={closeEditCardModal}
                    onSave={handleEditCard}
                    cardData={editingCardData}
                />
            </div>
        </>
    );
}
