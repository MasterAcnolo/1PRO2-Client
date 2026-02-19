import './dropdown.css';

import { useState } from 'react';

import { deleteElement } from '../../../script/services/deleteElement';

function DropDownCard({type, elementId, onDelete, onRename, onEdit, onDuplicate}) {

    const [isOpen, setIsOpen] = useState(false);

    function toggle(e) {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    }

    function handleDelete(e) {
        e.stopPropagation();
        setIsOpen(false);
        if (onDelete) {
            onDelete(e);
        } else {
            deleteElement(type, elementId);
        }
    }

    function handleRename(e) {
        e.stopPropagation();
        setIsOpen(false);
        if (onRename) {
            onRename(elementId);
        }
    }

    function handleEdit(e) {
        e.stopPropagation();
        setIsOpen(false);
        if (onEdit) {
            onEdit(elementId);
        }
    }

    function handleDuplicate(e) {
        e.stopPropagation();
        setIsOpen(false);
        if (onDuplicate) {
            onDuplicate(elementId);
        }
    }

    const isCard = type === "CARD";

    return(
    <>
       <div className='dropDown' onClick={e => e.stopPropagation()}>
            <img onClick={toggle} id="card-option" src='../../../assets/icon/3DotsIcon.png'></img>

            <div className='dropDown-content' style={{display: `${isOpen ? "flex" : "none"}`}}>
                {isCard ? (
                    <>
                        <p className='edit' onClick={handleEdit}>Modifier</p>
                        <p className='duplicate' onClick={handleDuplicate}>Dupliquer</p>
                        <p className='delete' id='delete' onClick={handleDelete}>Supprimer</p>
                    </>
                ) : (
                    <>
                        <p className='edit' id='edit' onClick={handleRename}>Renommer</p>
                        <p className='delete' id='delete' onClick={handleDelete}>Supprimer</p>
                    </>
                )}
            </div>
       </div>
    </>
);}

export {
    DropDownCard
}