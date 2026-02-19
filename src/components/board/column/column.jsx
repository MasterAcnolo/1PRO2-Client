import { useState } from 'react';
import TaskCard from '../card/card';
import { DropDownCard } from '../../../helpers/dropdown/dropdown';
import { createElement } from '../../../../script/services/services.createElement';
import { showToast } from '../../toast/toast';
import './column.css';
import '../../../../styles/overlay/createBoard.css';

export default function Column({ columnData, onDelete, onRename, onCardDelete, onCardRename, onCardEdit, onCardDuplicate, onRefresh }) {
    
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
    const [newCardName, setNewCardName] = useState("");
    const [newCardDescription, setNewCardDescription] = useState("");
    const [newCardDeadlineDate, setNewCardDeadlineDate] = useState("");
    const [newCardDeadlineTime, setNewCardDeadlineTime] = useState("");
    const [newCardColor, setNewCardColor] = useState(null);

    const CARD_COLORS = [
        { name: 'Aucune', value: null },
        { name: 'Rouge', value: '#ef4444' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Jaune', value: '#eab308' },
        { name: 'Vert', value: '#22c55e' },
        { name: 'Bleu', value: '#3b82f6' },
        { name: 'Violet', value: '#a855f7' },
        { name: 'Rose', value: '#ec4899' },
    ];

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete(columnData?.documentId || columnData?.id);
    }

    function handleRename(columnId) {
        if (onRename) onRename(columnId, columnData?.name);
    }

    function openCreateCardModal() {
        setIsCreateCardModalOpen(true);
    }

    function closeCreateCardModal() {
        setIsCreateCardModalOpen(false);
        setNewCardName("");
        setNewCardDescription("");
        setNewCardDeadlineDate("");
        setNewCardDeadlineTime("");
        setNewCardColor(null);
    }

    async function handleCreateCard() {
        if (newCardName.trim() === "") return;
        
        try {
            // Calculer l'ordre automatiquement (ordre = nombre de cartes existantes dans la colonne)
            const order = columnData?.cards ? columnData.cards.length : 0;
            
            // Construire la deadline complète
            let finalDeadline = null;
            if (newCardDeadlineDate || newCardDeadlineTime) {
                const today = new Date();
                const dateToUse = newCardDeadlineDate || today.toISOString().slice(0, 10);
                const timeToUse = newCardDeadlineTime || '00:00';
                finalDeadline = `${dateToUse}T${timeToUse}:00.000Z`;
            }
            
            const payload = { 
                data: { 
                    name: newCardName,
                    description: newCardDescription || null,  // Description optionnelle
                    deadline: finalDeadline,  // Deadline optionnelle
                    color: newCardColor ? newCardColor.replace('#', '') : null,  // Couleur optionnelle
                    order: order,
                    column: columnData?.documentId || columnData?.id  // Association à la colonne parente
                } 
            };
            
            await createElement("CARD", payload);
            if (onRefresh) await onRefresh();
            closeCreateCardModal();
            showToast("Carte créée avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            showToast("Erreur lors de la création de la carte", "error");
        }
    }

    return(
        <>
        <div className='column'>
            <div className='column-header'>
                <div className='column-header-left'>
                    <img id='column-grab' src='/assets/icon/6DotsIcon.png' alt='drag'></img>
                    <h3>{columnData?.name || 'Nouvelle colonne'}</h3>
                </div>
                <DropDownCard 
                    type="COLUMN" 
                    elementId={columnData?.documentId || columnData?.id} 
                    onDelete={handleDelete}
                    onRename={handleRename}
                />
            </div>

            <div className='column-content'>
                {/* Cards existantes */}
                {columnData?.cards && columnData.cards.length > 0 ? (
                    columnData.cards
                        .slice()  // Copie du tableau pour ne pas modifier l'original
                        .sort((a, b) => {
                            const orderA = a.order || 0;
                            const orderB = b.order || 0;
                            return orderA - orderB;  // Tri croissant par ordre
                        })
                        .map(card => (
                            <TaskCard 
                                key={card.id} 
                                cardData={card}
                                onDelete={onCardDelete}
                                onRename={onCardRename}
                                onEdit={onCardEdit}
                                onDuplicate={onCardDuplicate}
                            />
                        ))
                ) : null}
                
                {/* Bouton Add Card */}
                <div className='newCard' onClick={openCreateCardModal}>
                    <h3>+ Nouvelle carte</h3>
                </div>
            </div>
        </div>

        {/* Modale de création de carte */}
        {isCreateCardModalOpen && (
            <div className="createBoard-overlay" onClick={closeCreateCardModal}>
                <div className="createBoard" onClick={(e) => e.stopPropagation()}>
                    <h3>Création de Carte</h3>
                    <input 
                        type="text" 
                        placeholder="Nom de la carte" 
                        value={newCardName}
                        onChange={(e) => setNewCardName(e.target.value)}
                        autoFocus
                    />
                    <textarea 
                        placeholder="Description (optionnel)" 
                        value={newCardDescription}
                        onChange={(e) => setNewCardDescription(e.target.value)}
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
                                value={newCardDeadlineDate}
                                onChange={(e) => setNewCardDeadlineDate(e.target.value)}
                                style={{ flex: 1 }}
                            />
                            <input 
                                type="time"
                                value={newCardDeadlineTime}
                                onChange={(e) => setNewCardDeadlineTime(e.target.value)}
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
                                    className={`color-option ${newCardColor === colorOption.value ? 'selected' : ''}`}
                                    style={{
                                        backgroundColor: colorOption.value || '#e5e5e5',
                                        border: newCardColor === colorOption.value ? '3px solid #000' : '2px solid #ccc'
                                    }}
                                    onClick={() => setNewCardColor(colorOption.value)}
                                    title={colorOption.name}
                                >
                                    {!colorOption.value && '×'}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="buttons">
                        <button onClick={closeCreateCardModal}>Annuler</button>
                        <button onClick={handleCreateCard}>Créer</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}