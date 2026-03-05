// React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import "../../styles/pages/boardList.css";

// Helpers
import { DropDownCard } from '../components/dropdown/dropdown';
import { useUserIsLoggedRedirect } from '../../script/hooks/isLogged.hooks.js';

// Components
import RenameModal from '../components/modal/RenameModal';
import CreateModal from '../components/modal/CreateModal';
import { showToast } from '../components/toast/toast';
import Loader from '../components/loader/Loader';

// Services
import { createElement } from '../../script/services/createElement.services.js';
import { deleteElement } from '../../script/services/deleteElement.services.js';
import { updateElement } from '../../script/services/updateElement.services.js';
import { getElement } from '../../script/services/getElement.services.js';

function CardPreview({title, date, data_id, onDelete, onRename}){
    const date_ISO = new Date(date).toLocaleString();
    const navigate = useNavigate();

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete("BOARD", data_id);
    }

    function handleRename(boardId) {
        if (onRename) onRename(boardId, title);
    }

    return (
        <>
        <div className='card-preview' data_id = {data_id} onClick={() => navigate(`/board/${data_id}`)}>
            <div className='card-top'>
                <h4>{title}</h4>
                <DropDownCard type="BOARD" elementId={data_id} onDelete={handleDelete} onRename={handleRename}/>
            </div>
            <div className='card-bottom'>    
                <p>{date_ISO}</p>
            </div>
        </div>
        </>
    )
}

function AddBoard({ onClick }) {
    return (
        <div className='card-preview addCard' onClick={onClick}>
            <p>Nouveau Board</p>
            <p>+</p>
        </div>
    )
}

export default function BoardList(){
    useUserIsLoggedRedirect("/login");

    useEffect(() => {
        document.title = "Task Loader | Mes Boards";
    }, []);

    const [boards, setBoards] = useState([]);
    const [loadingBoards, setLoadingBoards] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [renamingBoardId, setRenamingBoardId] = useState(null);
    const [renamingBoardName, setRenamingBoardName] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);

    async function refreshBoards() {
        setLoadingBoards(true);
        try {
            const res = await getElement("BOARDLIST");
            setBoards(res.boards);
        } finally {
            setLoadingBoards(false);
        }
    }

    useEffect(() => {
        refreshBoards();
    }, []);

    async function handleCreateBoard(title) {
        setIsCreating(true);
        try {
            await createElement("BOARD", { data: { name: title } });
            setIsCreateModalOpen(false);
            await refreshBoards();
            showToast("Board créé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            showToast("Erreur lors de la création du board", "error");
        } finally {
            setIsCreating(false);
        }
    }

    async function handleDeleteBoard(type, id) {
        try {
            await deleteElement(type, id);
            await refreshBoards();
            showToast("Board supprimé", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            showToast("Erreur lors de la suppression du board", "error");
        }
    }

    function openRenameModal(boardId, currentName) {
        setRenamingBoardId(boardId);
        setRenamingBoardName(currentName);
        setIsRenameModalOpen(true);
    }

    function closeRenameModal() {
        setIsRenameModalOpen(false);
        setRenamingBoardId(null);
        setRenamingBoardName("");
    }

    async function handleRenameBoard(newName) {
        if (!renamingBoardId || newName.trim() === "") return;
        setIsRenaming(true);
        try {
            const payload = { data: { name: newName } };
            await updateElement("BOARD", renamingBoardId, payload);
            
            await refreshBoards();
            closeRenameModal();
            showToast("Board renommé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors du renommage:", error);
            showToast("Erreur lors du renommage du board", "error");
        } finally {
            setIsRenaming(false);
        }
    }

    return (
        <section className='main'>
            <h1> Vos Boards </h1>

            <section className='board-list-container'>
                {loadingBoards ? (
                    <Loader text="Chargement des boards..." />
                ) : (
                    <>
                        {(Array.isArray(boards) ? [...boards] : [])
                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map(board =>(
                            <CardPreview 
                                key={board.id}
                                data_id={board.documentId}
                                title={board.name}
                                date={board.updatedAt}
                                onDelete={handleDeleteBoard}
                                onRename={openRenameModal}
                            />
                        ))}

                        <AddBoard onClick={() => setIsCreateModalOpen(true)}/>
                    </>
                )}
            </section>

            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateBoard}
                title="Création de Board"
                placeholder="Titre du board"
                submitLabel="Créer"
                isLoading={isCreating}
            />

            <RenameModal 
                isOpen={isRenameModalOpen}
                onClose={closeRenameModal}
                onRename={handleRenameBoard}
                currentName={renamingBoardName}
                type="BOARD"
                isLoading={isRenaming}
            />
        </section>
    )
}
