// React
import { useState, useEffect } from 'react';

// CSS
import './Modal.css';

// Components
import { ButtonSpinner } from '../loader/Loader';

function RenameModal({ isOpen, onClose, onRename, currentName, type, isLoading = false }) {
    const [newName, setNewName] = useState(currentName || '');

    // Sync avec la prop quand elle change
    useEffect(() => {
        setNewName(currentName || '');
    }, [currentName]);

    if (!isOpen) return null;

    function handleSubmit() {
        if (newName.trim() === '' || isLoading) return;
        onRename(newName);
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
        <div className="renameModal-overlay" onClick={isLoading ? undefined : onClose}>
            <div className="renameModal" onClick={(e) => e.stopPropagation()}>
                <h3>Renommer {getTitle()}</h3>
                <input 
                    type="text" 
                    placeholder="Nouveau nom" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                />

                <div className="buttons">
                    <button onClick={onClose} disabled={isLoading}>Annuler</button>
                    <button onClick={handleSubmit} disabled={isLoading} className={isLoading ? 'loading' : ''}>
                        {isLoading && <ButtonSpinner />}
                        {isLoading ? 'Renommage...' : 'Renommer'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RenameModal;
