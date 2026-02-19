import { useState } from 'react';
import TaskCard from './card/card';
import { DropDownCard } from '../../../helpers/dropdown/dropdown';
import { createElement } from '../../../../script/services/createElement';
import { showToast } from '../../toast/toast';
import './column.css';
import '../../../../styles/overlay/createBoard.css';

export default function Column({ columnData, onDelete, onRename, onCardDelete, onCardRename, onRefresh }) {
    
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
    const [newCardName, setNewCardName] = useState("");
    const [newCardDescription, setNewCardDescription] = useState("");

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
    }

    async function handleCreateCard() {
        if (newCardName.trim() === "") return;
        
        try {
            // Calculer l'ordre automatiquement (ordre = nombre de cartes existantes dans la colonne)
            const order = columnData?.cards ? columnData.cards.length : 0;
            
            const payload = { 
                data: { 
                    name: newCardName,
                    description: newCardDescription || null,  // Description optionnelle
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