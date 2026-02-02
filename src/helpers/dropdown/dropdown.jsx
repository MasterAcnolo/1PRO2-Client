import './dropdown.css';

import { useState } from 'react';

import { deleteElement } from '../../../script/services/deleteElement';

function DropDownCard({type, elementId, onDelete}) {

    const [isOpen, setIsOpen] = useState(false);

    function toggle(e) {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    }

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) {
            onDelete(e);
        } else {
            deleteElement(type, elementId);
        }
    }


    return(
    <>
       <div className='dropDown' onClick={e => e.stopPropagation()}>
            <img onClick={toggle} id="card-option" src='../../../assets/icon/3DotsIcon.png'></img>

            <div className='dropDown-content' style={{display: `${isOpen ? "flex" : "none"}`}}>
                <p className='edit' id='edit'>Modifier</p>
                <p className='delete' id='delete' onClick={handleDelete}>Supprimer</p>

            </div>
       </div>
    </>
);}

export {
    DropDownCard
}