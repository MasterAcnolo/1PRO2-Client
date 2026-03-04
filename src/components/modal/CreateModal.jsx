// React
import { useState, useEffect } from 'react';

// Components
import { ButtonSpinner } from '../loader/Loader';

// CSS
import './Modal.css';
import '../../../styles/overlay/createBoard.css';

export default function CreateModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title = "Création", 
    placeholder = "Nom",
    submitLabel = "Créer",
    isLoading = false 
}) {
    const [value, setValue] = useState('');

    // Reset du formulaire à la fermeture
    useEffect(() => {
        if (!isOpen) {
            setValue('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (value.trim() === '' || isLoading) return;
        onSubmit(value.trim());
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="createBoard-overlay" onClick={isLoading ? undefined : onClose}>
            <div className="createBoard" onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyUp ={handleKeyPress}
                    disabled={isLoading}
                    autoFocus
                />
                <div className="buttons">
                    <button onClick={onClose} disabled={isLoading}>
                        Annuler
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isLoading || value.trim() === ''} 
                        className={isLoading ? 'loading' : ''}
                    >
                        {isLoading && <ButtonSpinner />}
                        {isLoading ? 'Création...' : submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
