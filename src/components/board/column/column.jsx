// React
import { useState } from 'react';

// DND KIT
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
    columnData, onDelete, onRename, 
    onCardDelete, onCardRename, onCardEdit, onCardDuplicate, 
    onRefresh, 
}) {   
    const columnId = columnData?.documentId || columnData?.id;
    
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
        id: columnId,
        data: { type: 'column', columnId }
    });

    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

    const sortedCards = columnData?.cards 
        ? [...columnData.cards].sort((a, b) => (a.order || 0) - (b.order || 0))
        : [];
    const cardIds = sortedCards.map(card => `card-${card.documentId || card.id}`);

    async function handleCreateCard(cardData) {
        if (!cardData.name?.trim()) return;
        try {
            await createElement("CARD", {
                data: {
                    ...cardData,
                    order: columnData?.cards?.length || 0,
                    column: columnId
                }
            });
            await onRefresh?.();
            setIsCreateCardModalOpen(false);
            showToast("Carte créée avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            showToast("Erreur lors de la création de la carte", "error");
        }
    }

    return (
        <>
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`column ${isDragging ? 'dragging' : ''}`}>
            <div className='column-header'>
                <div className='column-header-left'>
                    <img id='column-grab' src='/assets/icon/6DotsIcon.png' alt='drag' {...attributes} {...listeners} />
                    <h3>{columnData?.name || 'Nouvelle colonne'}</h3>
                </div>
                <DropDownCard 
                    type="COLUMN" 
                    elementId={columnId} 
                    onDelete={(e) => { e.stopPropagation(); onDelete?.(columnId); }}
                    onRename={() => onRename?.(columnId, columnData?.name)}
                />
            </div>

            <div className='column-content'>
                <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
                    {sortedCards.map(card => (
                        <TaskCard 
                            key={card.documentId || card.id} 
                            cardData={card}
                            columnId={columnId}
                            onDelete={onCardDelete}
                            onRename={onCardRename}
                            onEdit={onCardEdit}
                            onDuplicate={onCardDuplicate}
                        />
                    ))}
                </SortableContext>

                <div className='newCard no-export' onClick={() => setIsCreateCardModalOpen(true)}>
                    <h3>+ Nouvelle carte</h3>
                </div>
            </div>
        </div>

        <CardModal
            isOpen={isCreateCardModalOpen}
            onClose={() => setIsCreateCardModalOpen(false)}
            onSubmit={handleCreateCard}
            mode="create"
        />
        </>
    );
}