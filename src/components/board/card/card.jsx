// DND KIT
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Components
import { DropDownCard } from '../../dropdown/dropdown';

// Variables
import { CARD_LABELS } from '../../../../script/variables';

// CSS
import './card.css';

// Parse les labels de la carte
function parseLabels(labels) {
    if (!labels) return [];
    
    let parsed = labels;
    if (typeof labels === 'string') {
        try { parsed = JSON.parse(labels); } 
        catch { return []; }
    }
    return parsed.map(id => CARD_LABELS[id]).filter(Boolean);
}

export default function TaskCard({ cardData, columnId, onDelete, onRename, onEdit, onDuplicate }) {
    const cardId = cardData?.documentId || cardData?.id;
    
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
        id: `card-${cardId}`,
        data: { type: 'card', card: cardData, columnId }
    });

    const labels = parseLabels(cardData?.labels);
    const color = cardData?.color;

    const style = {
        boxShadow: color ? `inset 0 0 0 4px #${color}` : 'none',
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
        position: isDragging ? 'relative' : 'static',
    };

    return (
        <div 
            ref={setNodeRef} 
            className={`column_card ${isDragging ? 'dragging' : ''}`} 
            style={style}
            onDoubleClick={() => onEdit?.(cardId)}
        >
            {/* Header */}
            <div className='column_card-header'>
                <div className='column_card-header-left'>
                    <img id='column_card-grab' src='/assets/icon/6DotsIcon.png' alt='drag' {...attributes} {...listeners} />
                    <h3 title={cardData?.name || ""}>{cardData?.name || 'Nouvelle carte'}</h3>
                </div>
                <DropDownCard 
                    type="CARD" 
                    elementId={cardId}
                    onDelete={(e) => { e.stopPropagation(); onDelete?.(cardId); }}
                    onRename={() => onRename?.(cardId, cardData?.name)}
                    onEdit={() => onEdit?.(cardId)}
                    onDuplicate={() => onDuplicate?.(cardId)}
                />
            </div>

            {/* Content */}
            <div className='column_card-content'>
                {cardData?.description && (
                    <div className='column_card-description'>{cardData.description}</div>
                )}

                {labels.length > 0 && (
                    <div className='column_card-labels'>
                        {labels.map(label => (
                            <span 
                                key={label.id}
                                className='card-label'
                                style={{
                                    backgroundColor: `${label.color}20`,
                                    color: label.color,
                                    border: `1px solid ${label.color}40`
                                }}
                            >
                                {label.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer - Deadline */}
            {cardData?.deadline && (
                <div className='column_card-content-footer'>
                    <div className='deadline' style={{
                        backgroundColor: color ? `#${color}20` : '#e3f2fd',
                        color: color ? `#${color}` : '#1976d2'
                    }}>
                        <img src='/assets/icon/calendar.svg' alt='calendrier' style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
                        {new Date(cardData.deadline).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                            timeZone: 'UTC'
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}