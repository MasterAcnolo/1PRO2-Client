import { StrictMode } from 'react';

import "../../styles/pages/boardList.css"

export default function BoardList(){
    return (
        <>
          <StrictMode>

                <Header/>

                <section className='main'>
                    <h1> Vos Boards </h1>

                    <section className='board-container'>
                        
                    </section>
                </section>

                <Footer/> 
                
            </StrictMode>
        </>
    )
}