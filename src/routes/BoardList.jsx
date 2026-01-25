import { useEffect, useState } from 'react';

import "../../styles/pages/boardList.css"
import "../../styles/form/createBoard.css"

import fetchElement from '../../script/fetch';

import { DropDownCard } from '../helpers/dropdown/dropdown';
import {useIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';
import { getToken } from '../../script/helpers/getToken';

import { createElement } from '../../script/services/createElement';

function CardPreview({title, date, data_id}){

    const date_ISO = new Date(date).toLocaleString();

    return (
        <>
        <div className='card-preview' data_id = {data_id}>
            <DropDownCard /> 

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
    useIsLoggedRedirect();

    const [boards, setBoards] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [title, setTitle] = useState(false);

    useEffect(() => {
        async function fetchCard(){
            const res = await fetchElement();
            setBoards(res.boards);
        }
        fetchCard();
    }, []);

    function togglePanel() {
        setIsPanelOpen(prev => !prev);
    }

    function payload(title){
        return {
             data: { "name": title }
        }
    }

    function handleDelete(ID){
            
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
                            <button onClick={() => createElement("BOARD", payload(title))} >Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
