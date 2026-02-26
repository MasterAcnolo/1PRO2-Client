// React
import { useState } from 'react';

// DND KIT
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Components
import TaskCard from '../card/card';
import CardModal from "../../modal/CardModal";
import { DropDownCard } from "../../dropdown/dropdown";
import { showToast } from '../../toast/toast';

// Services
import { createElement } from '../../../../script/services/createElement.services';

// CSS
import './column.css';
import '../../../../styles/overlay/createBoard.css';

export default function Column({ 
            columnData, 
            onDelete, 
            onRename, 
            onCardDelete, 
            onCardRename, 
            onCardEdit, 
            onCardDuplicate, 
            onRefresh }) 
    {    
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: columnData.documentId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

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
    }

    async function handleCreateCard(cardData) {
        if (!cardData.name || cardData.name.trim() === "") return;
        try {
            const order = columnData?.cards ? columnData.cards.length : 0;
            const payload = {
                data: {
                    ...cardData,
                    order,
                    column: columnData?.documentId || columnData?.id
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
        <div ref={setNodeRef} style={style} className="column">
            <div className='column-header'>
                <div className='column-header-left'>
                    <img id='column-grab' src='/assets/icon/6DotsIcon.png' alt='drag' {...attributes} {...listeners} ></img>
                    <h3>{columnData?.name || 'Nouvelle colonne'}</h3>
                </div>
                <DropDownCard 
                    type="COLUMN" 
                    elementId={columnData?.documentId || columnData?.id} 
                    onDelete={handleDelete}
                    onRename={() => onRename(columnData.documentId, columnData.name)}
                />
            </div>

            <div className='column-content'>
                {/* Cards existantes */}
                {columnData?.cards && columnData.cards.length > 0 ? (
                    columnData.cards
                        .slice()
                        .sort((a, b) => {
                            const orderA = a.order || 0;
                            const orderB = b.order || 0;
                            return orderA - orderB;
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
                <div className='newCard no-export' onClick={openCreateCardModal}>
                    <h3>+ Nouvelle carte</h3>
                </div>
            </div>
        </div>

        {/* Modale de création de carte */}
        <CardModal
            isOpen={isCreateCardModalOpen}
            onClose={closeCreateCardModal}
            onSubmit={handleCreateCard}
            mode="create"
        />
        </>
    );
}