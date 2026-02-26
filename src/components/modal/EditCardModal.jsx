// React
import { useState, useEffect } from 'react';

// Variables
import { CARD_COLORS, CARD_LABELS } from '../../../script/variables';

// CSS
import './renameModal.css';

function EditCardModal({ isOpen, onClose, onSave, cardData }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');
    const [color, setColor] = useState(null);
    const [selectedLabels, setSelectedLabels] = useState([]);

    useEffect(() => {
        if (cardData) {
            setName(cardData.name || '');
            setDescription(cardData.description || '');
            
            // Convertir la deadline en format date et time séparés si elle existe
            if (cardData.deadline) {
                const date = new Date(cardData.deadline);
                const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
                const timeStr = date.toISOString().slice(11, 16); // HH:MM
                setDeadlineDate(dateStr);
                setDeadlineTime(timeStr);
            } else {
                setDeadlineDate('');
                setDeadlineTime('');
            }

            // Gestion des labels
            if (cardData.labels) {
                try {
                    const labels = typeof cardData.labels === 'string' 
                        ? JSON.parse(cardData.labels) 
                        : cardData.labels;
                    setSelectedLabels(Array.isArray(labels) ? labels : []);
                } catch {
                    setSelectedLabels([]);
                }
            } else {
                setSelectedLabels([]);
            }
            
            // Ajouter '#' si la couleur existe (backend stocke sans '#')
            setColor(cardData.color ? `#${cardData.color}` : null);
        }
    }, [cardData]);

    if (!isOpen) return null;

    function handleAddLabel(labelId) {
        if (!labelId || selectedLabels.includes(labelId)) return;
        setSelectedLabels(prev => [...prev, labelId]);
    }

    function handleRemoveLabel(labelId) {
        setSelectedLabels(prev => prev.filter(id => id !== labelId));
    }

    function handleSubmit() {
        if (name.trim() === '') return;
        
        // Construire la deadline complète
        let finalDeadline = null;
        if (deadlineDate || deadlineTime) {
            const today = new Date();
            const dateToUse = deadlineDate || today.toISOString().slice(0, 10);
            const timeToUse = deadlineTime || '00:00';
            finalDeadline = `${dateToUse}T${timeToUse}:00.000Z`;
        }
        
        const updatedData = {
            name: name,
            description: description || null,
            deadline: finalDeadline,
            color: color ? color.replace('#', '') : null,
            labels: selectedLabels.length ? JSON.stringify(selectedLabels) : []
        };
        
        onSave(updatedData);
        onClose();
    }

    return (
        <div className="createBoard-overlay" onClick={onClose}>
            <div className="createBoard editCardModal" onClick={(e) => e.stopPropagation()}>
                <h3>Modifier la Carte</h3>
                
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
                                {!colorOption.value && 'x'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group labels-section">
                        <label>Labels</label>

                        <select 
                            value="" 
                            onChange={(e) => handleAddLabel(e.target.value)}
                        >
                            <option value="">Ajouter un label</option>
                            {Object.values(CARD_LABELS)
                                .filter(label => !selectedLabels.includes(label.id))
                                .map(label => (
                                    <option key={label.id} value={label.id}>
                                        {label.name}
                                    </option>
                                ))
                            }
                        </select>

                        <div className="selected-labels">
                        {selectedLabels.map(id => {
                            const label = CARD_LABELS[id];
                            return (
                            <span
                                key={id}
                                className="label-badge"
                                style={{ backgroundColor: label.color }}
                            >
                                {label.name} 
                                <span 
                                style={{ marginLeft: '6px', cursor: 'pointer', fontWeight: '700' }}
                                onClick={() => handleRemoveLabel(id)}
                                >
                                x
                                </span>
                            </span>
                            );
                        })}
                        </div>
                    </div>
                    
            <div className="buttons">
                <button onClick={onClose}>Annuler</button>
                <button onClick={handleSubmit}>Enregistrer</button>
            </div>

            </div>

        </div>
    );
}

export default EditCardModal;
