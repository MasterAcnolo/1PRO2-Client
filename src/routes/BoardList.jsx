import { useEffect, useState } from 'react';

import "../../styles/pages/boardList.css"
import "../../styles/form/createBoard.css"

import fetchElement from '../../script/utils/fetch';

import { DropDownCard } from '../helpers/dropdown/dropdown';
import {useIsLoggedRedirect} from '../../script/hooks/hooks.isLogged';
import { getToken } from '../../script/helpers/token';

function CardPreview({title, date, data_id}){
    return (
        <>
        <div className='card-preview' data_id = {d}>
            <DropDownCard /> 

            <div className='bottom'>
                <h4> {title} </h4>
                <p> Dernière Modification: {date}</p>
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

async function postBoard(title){
    const TOKEN = getToken();

    const API_URL = "http://localhost:1337/api";

    const payload = {
        "data":{
            "name":title
        }

    };

    const res = await fetch(`${API_URL}/boards/`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                    },
        body: JSON.stringify(payload),
    });

    const json = await res.json();

    console.log(json)


    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

    if(res.ok){
        window.location.reload(); // Si jamais c'est good on doit amener au board 
    }
    console.log(json)

}

async function deleteBoard(documentId){
    const TOKEN = getToken();

    const API_URL = "http://localhost:1337/api";

    const payload = {
        "data":{
            "name":title
        }

    };

    const res = await fetch(`${API_URL}/boards/`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                    },
        body: JSON.stringify(payload),
    });

    const json = await res.json();

    console.log(json)


    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

    if(res.ok){
        window.location.reload(); // Si jamais c'est good on doit amener au board 
    }
    console.log(json)

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

    useEffect(()=>{
        
    })

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
                            <button onClick={() => postBoard(title)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
