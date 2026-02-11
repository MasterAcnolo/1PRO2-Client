import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/pages/board.css"

import { useUserIsLoggedRedirect } from "../../script/hooks/hooks.isLogged";
import { getElement } from "../../script/services/getElement";
import { deleteElement } from "../../script/services/deleteElement";
import { updateElement } from "../../script/services/updateElement";
import { showToast } from "../components/toast/toast";
import Column from "../components/board/column/column";
import RenameModal from "../components/modal/RenameModal";

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
                        board.columns.map(column => (
                            <Column 
                                key={column.id} 
                                columnData={column}
                                onDelete={handleDeleteColumn}
                                onRename={openRenameColumnModal}
                                onCardDelete={handleDeleteCard}
                                onCardRename={openRenameCardModal}
                            />
                        ))
                    ) : (
                        <Column />
                    )}
                    
                    {/* Bouton Add Column */}
                    <div className='newColumn'>
                        <h3>+ Nouvelle Colonne</h3>
                    </div>
                </div>

                <RenameModal 
                    isOpen={isRenameModalOpen}
                    onClose={closeRenameModal}
                    onRename={handleRename}
                    currentName={renamingName}
                    type={renameType}
                />
            </div>
        </>
    );
}
