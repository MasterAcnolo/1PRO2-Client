import Column_Card from './card/column_card';
import { DropDownCard } from '../../../helpers/dropdown/dropdown';
import './column.css';

export default function Column({ columnData, onDelete, onRename, onCardDelete, onCardRename }) {

    function handleDelete(e) {
        e.stopPropagation();
        if (onDelete) onDelete(columnData?.documentId || columnData?.id);
    }

    function handleRename(columnId) {
        if (onRename) onRename(columnId, columnData?.name);
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
                    columnData.cards.map(card => (
                        <Column_Card 
                            key={card.id} 
                            cardData={card}
                            onDelete={onCardDelete}
                            onRename={onCardRename}
                        />
                    ))
                ) : null}
                
                {/* Bouton Add Card */}
                <div className='newCard'>
                    <h3>+ Nouvelle carte</h3>
                </div>
            </div>
        </div>
        </>
    );
}