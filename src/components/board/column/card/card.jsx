import './card.css';

import DropDown from '../../../../helpers/dropdown/dropdown';

export default function TaskCard({titre, description, date}) {

    return(
    <>
       <div className='card'>
        <div className='card-header'>
            <div className='card-header-left'>
                <img id='card-grab' src='../../../assets/icon/6DotsIcon.png'></img>
                <h3> {titre} </h3>
            
            </div>
            <DropDown />
        </div>

        <div className='card-content'>
            <p>
                {description}
            </p>
        </div>

        <div className='card-footer'>
            <div className='card-labels'>
                {/* LABELS GOES HERE */}
            </div>
            <p className='card-date' id='card-date'>{date}</p>
        </div>

        </div> 
    </>
);}