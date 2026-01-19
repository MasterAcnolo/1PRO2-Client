import { StrictMode } from 'react';

// Components
import Header from '../components/layout/header/header.jsx';
import Footer from '../components/layout/footer/footer.jsx';

import TaskCard from '../components/board/column/card/card.jsx';

export default function Board(){
    return (
        <>
          <StrictMode>

                <Header/>

                <TaskCard 
                titre="Titre"
                description="Ceci est une description qui decrit"
                date="EE"
                
                />

                <Footer/> 
                
            </StrictMode>
        </>
    )
}