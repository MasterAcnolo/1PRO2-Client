import './dropdown.css';
import { useState, useRef } from 'react';
import { deleteElement } from '../../../script/services/deleteElement';
import { useClickOutside } from '../../../script/hooks/hooks.clickOutside';

function DropDownCard({type, elementId, onDelete, onRename, onEdit, onDuplicate}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

    const toggle = (e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    const handleAction = (e, callback, ...args) => {
        e.stopPropagation();
        setIsOpen(false);
        if (callback) callback(...args);
    };

    const isCard = type === "CARD";

    return (
        <div ref={dropdownRef} className='dropDown' onClick={e => e.stopPropagation()}>
            <img onClick={toggle} id="card-option" src='../../../assets/icon/3DotsIcon.png' alt="options" />
            
            {isOpen && (
                <div className='dropDown-content'>
                    {isCard ? (
                        <>
                            <p className='edit' onClick={e => handleAction(e, onEdit, elementId)}>Modifier</p>
                            <p className='duplicate' onClick={e => handleAction(e, onDuplicate, elementId)}>Dupliquer</p>
                            <p className='delete' onClick={e => handleAction(e, onDelete || (() => deleteElement(type, elementId)), e)}>Supprimer</p>
                        </>
                    ) : (
                        <>
                            <p className='edit' onClick={e => handleAction(e, onRename, elementId)}>Renommer</p>
                            <p className='delete' onClick={e => handleAction(e, onDelete || (() => deleteElement(type, elementId)), e)}>Supprimer</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export {
    DropDownCard
}