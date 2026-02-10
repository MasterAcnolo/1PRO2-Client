import { useState } from 'react';
import './renameModal.css';

function RenameModal({ isOpen, onClose, onRename, currentName, type }) {
    const [newName, setNewName] = useState(currentName || '');

    if (!isOpen) return null;

    function handleSubmit() {
        if (newName.trim() === '') return;
        onRename(newName);
        onClose();
    }

    function getTitle() {
        switch(type) {
            case 'BOARD':
                return 'le Board';
            case 'COLUMN':
                return 'la Colonne';
            case 'CARD':
                return 'la Carte';
            default:
                return 'l\'élément';
        }
    }

    return (
        <div className="renameModal-overlay" onClick={onClose}>
            <div className="renameModal" onClick={(e) => e.stopPropagation()}>
                <h3>Renommer {getTitle()}</h3>
                <input 
                    type="text" 
                    placeholder="Nouveau nom" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                />

                <div className="buttons">
                    <button onClick={onClose}>Annuler</button>
                    <button onClick={handleSubmit}>Renommer</button>
                </div>
            </div>
        </div>
    );
}

export default RenameModal;
