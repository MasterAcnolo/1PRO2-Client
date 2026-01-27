import './dropdown.css';

import { useState } from 'react';

import { deleteElement } from '../../../script/services/deleteElement';

function DropDownCard({type, elementId}) {

    const [isOpen, setIsOpen] = useState(false);

    return(
    <>
       <div className='dropDown'>
            <img onClick={() => setIsOpen(valeurInitiale => !valeurInitiale)} id="card-option" src='../../../assets/icon/3DotsIcon.png'></img>

            <div className='dropDown-content' style={{display: `${isOpen ? "flex" : "none"}`}}>
                <p className='edit' id='edit'>Modifier</p>
                <p className='delete' id='delete' onClick={()=>{deleteElement(type, elementId)}}>Supprimer</p>

            </div>
       </div>
    </>
);}

export {
    DropDownCard
}