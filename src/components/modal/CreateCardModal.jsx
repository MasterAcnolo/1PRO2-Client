// React
import { useState } from 'react';

// Variables
import { CARD_COLORS } from '../../../script/variables';

// CSS
import './renameModal.css';

export default function CreateCardModal({ isOpen, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');
    const [color, setColor] = useState(null);

    if (!isOpen) return null;

    function handleSubmit() {
        if (name.trim() === '') return;
        
        let finalDeadline = null;
        if (deadlineDate || deadlineTime) {
            const today = new Date();
            const dateToUse = deadlineDate || today.toISOString().slice(0, 10);
            const timeToUse = deadlineTime || '00:00';
            finalDeadline = `${dateToUse}T${timeToUse}:00.000Z`;
        }
        
        onCreate({
            name,
            description: description || null,
            deadline: finalDeadline,
            color: color ? color.replace('#', '') : null,
        });
        
        // Reset form
        setName('');
        setDescription('');
        setDeadlineDate('');
        setDeadlineTime('');
        setColor(null);
        onClose();
    }

    return (
        <div className="createBoard-overlay" onClick={onClose}>
            <div className="createBoard" onClick={(e) => e.stopPropagation()}>
                <h3>Création de Carte</h3>
                
                <input 
                    type="text" 
                    placeholder="Nom de la carte" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                
                <textarea 
                    placeholder="Description (optionnel)" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
                
                <div className="form-group">
                    <label>
                        <img src="/assets/icon/calendar.svg" alt="calendrier" style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} />
                        Date et heure limite (optionnel)
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="date"
                            value={deadlineDate}
                            onChange={(e) => setDeadlineDate(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="time"
                            value={deadlineTime}
                            onChange={(e) => setDeadlineTime(e.target.value)}
                            style={{ flex: 1 }}
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Couleur de la carte</label>
                    <div className="color-picker">
                        {CARD_COLORS.map((colorOption) => (
                            <button
                                key={colorOption.name}
                                type="button"
                                className={`color-option ${color === colorOption.value ? 'selected' : ''}`}
                                style={{
                                    backgroundColor: colorOption.value || '#e5e5e5',
                                    border: color === colorOption.value ? '3px solid #000' : '2px solid #ccc'
                                }}
                                onClick={() => setColor(colorOption.value)}
                                title={colorOption.name}
                            >
                                {!colorOption.value && '×'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={onClose}>Annuler</button>
                    <button onClick={handleSubmit}>Créer</button>
                </div>
            </div>
        </div>
    );
}
