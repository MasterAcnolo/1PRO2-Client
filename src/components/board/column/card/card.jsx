import { DropDownCard } from '../../../../helpers/dropdown/dropdown';
import './card.css';

export default function TaskCard({ cardData, onDelete, onRename }){

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete(cardData?.documentId || cardData?.id);
    }

    function handleRename(cardId) {
        if (onRename) onRename(cardId, cardData?.name);
    }

	return(
		<>
		<div className='column_card'>

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
                />
			</div>

			<div className='column_card-content'>
				<div>{cardData?.description || 'Description'}</div>
				<div className='column_card-content-footer'>
                    <div>{cardData?.label || 'Label'}</div>
                    <div>{cardData?.dueDate ? new Date(cardData.dueDate).toLocaleDateString() : 'Date'}</div>
                </div>
			</div>
		</div>
		</>
	);
}