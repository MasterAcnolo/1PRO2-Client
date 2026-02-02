import { useEffect, useState } from 'react';

import "../../styles/pages/boardList.css"
import "../../styles/overlay/createBoard.css"

import fetchElement from '../../script/fetch';

import { DropDownCard } from '../helpers/dropdown/dropdown';
import {userIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';

import { createElement } from '../../script/services/createElement';
import { deleteElement } from '../../script/services/deleteElement';
import { useNavigate } from 'react-router-dom';

function CardPreview({title, date, data_id, onDelete}){
    const date_ISO = new Date(date).toLocaleString();
    const navigate = useNavigate();

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete("BOARD", data_id);
    }

    return (
        <>
        <div className='card-preview' data_id = {data_id} onClick={() => navigate(`/board/${data_id}`)}>
            <DropDownCard type="BOARD" elementId={data_id} onDelete={handleDelete}/> 
            <div className='bottom'>    
                <h4> {title} </h4>
                <p> Dernière Modification: {date_ISO}</p>
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
    userIsLoggedRedirect();

    const [boards, setBoards] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [title, setTitle] = useState("");

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
        await createElement("BOARD", payload(title));
        setIsPanelOpen(false);
        await refreshBoards();
    }

    async function handleDeleteBoard(type, id) {
        await deleteElement(type, id);
        await refreshBoards();
    }

    return (
        <section className='main'>
            <h1> Vos Boards </h1>

            <section className='board-container'>
                {boards.map(board =>(
                    <CardPreview 
                        key={board.id}
                        data_id={board.documentId}
                        title={board.name}
                        date={board.updatedAt}
                        onDelete={handleDeleteBoard}
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
        </section>
    )
}
