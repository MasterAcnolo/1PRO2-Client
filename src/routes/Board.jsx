import { StrictMode } from 'react';

import TaskCard from '../components/board/column/card/card.jsx';

export default function Board(){
    return (
        <>
          <StrictMode>

                <TaskCard 
                titre="Titre"
                description="Ceci est une description qui decrit"
                date="EE"
                />
                
            </StrictMode>
        </>
    )
}