import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../styles/pages/boardList.css"
import "../../styles/overlay/createBoard.css"

import fetchElement from '../../script/fetch';

import { DropDownCard } from '../helpers/dropdown/dropdown';
import {useUserIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';

import RenameModal from '../components/modal/RenameModal';

import { createElement } from '../../script/services/services.createElement';
import { deleteElement } from '../../script/services/services.deleteElement';
import { updateElement } from '../../script/services/services.updateElement';

import { showToast } from '../components/toast/toast';

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
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [title, setTitle] = useState("");
    
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [renamingBoardId, setRenamingBoardId] = useState(null);
    const [renamingBoardName, setRenamingBoardName] = useState("");

    async function refreshBoards() {
        const res = await fetchElement();
        setBoards(res.boards);
    }

    useEffect(() => {
        refreshBoards();
    }, []);

    function togglePanel() {
        setIsPanelOpen(prev => !prev);
    }

    function payload(title){
        return {
             data: { "name": title }
        }
    }

    async function handleCreateBoard() {
        if(title === "") return;
        try {
            await createElement("BOARD", payload(title));
            setIsPanelOpen(false);
            setTitle("");
            await refreshBoards();
            showToast("Board créé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            showToast("Erreur lors de la création du board", "error");
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
        
        try {
            const payload = { data: { name: newName } };
            await updateElement("BOARD", renamingBoardId, payload);
            
            await refreshBoards();
            closeRenameModal();
            showToast("Board renommé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors du renommage:", error);
            showToast("Erreur lors du renommage du board", "error");
        }
    }

    return (
        <section className='main'>
            <h1> Vos Boards </h1>

            <section className='board-list-container'>
                {boards.map(board =>(
                    <CardPreview 
                        key={board.id}
                        data_id={board.documentId}
                        title={board.name}
                        date={board.updatedAt}
                        onDelete={handleDeleteBoard}
                        onRename={openRenameModal}
                    />
                ))}

                <AddBoard onClick={togglePanel}/>
            </section>

            {isPanelOpen && (
                <div className="createBoard-overlay">
                    <div className="createBoard">
                        <h3>Création de Board</h3>
                        <input type="text" placeholder="Titre" onChange={(e)=>{setTitle(e.target.value)}}/>

                        <div className="buttons">
                            <button onClick={togglePanel}>Annuler</button>
                            <button onClick={handleCreateBoard}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}

            <RenameModal 
                isOpen={isRenameModalOpen}
                onClose={closeRenameModal}
                onRename={handleRenameBoard}
                currentName={renamingBoardName}
                type="BOARD"
            />
        </section>
    )
}
