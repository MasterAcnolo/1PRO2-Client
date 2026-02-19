// Components
import { DropDownCard } from '../../../helpers/dropdown/dropdown';

// CSS
import './card.css';

export default function TaskCard({ cardData, onDelete, onRename, onEdit, onDuplicate }){

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete(cardData?.documentId || cardData?.id);
    }

    function handleRename(cardId) {
        if (onRename) onRename(cardId, cardData?.name);
    }

    function handleEdit(cardId) {
        if (onEdit) onEdit(cardId);
    }

    function handleDuplicate(cardId) {
        if (onDuplicate) onDuplicate(cardId);
    }

	return(
		<>
		<div className='column_card' style={{
			boxShadow: cardData?.color ? `inset 0 0 0 4px #${cardData.color}` : 'none'
		}}>

			<div className='column_card-header'>
				<div className='column_card-header-left'>
                    <img id='column_card-grab' src='/assets/icon/6DotsIcon.png' alt='drag'></img>
                   <h3>{cardData?.name || 'Nouvelle carte'}</h3>
                </div>
				<DropDownCard 
                    type="CARD" 
                    elementId={cardData?.documentId || cardData?.id}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                />
			</div>

			<div className='column_card-content'>
			{cardData?.description && <div className='column_card-description'>{cardData.description}</div>}
		</div>
		
		{cardData?.deadline && (
			<div className='column_card-content-footer'>
				<div className='deadline' style={{
					backgroundColor: cardData?.color ? `#${cardData.color}20` : '#e3f2fd',
					color: cardData?.color ? `#${cardData.color}` : '#1976d2'
				}}>
					<img src='/assets/icon/calendar.svg' alt='calendrier' style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
					{new Date(cardData.deadline).toLocaleDateString('fr-FR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					})}
				</div>
			</div>
		)}
		</div>
		</>
	);
}