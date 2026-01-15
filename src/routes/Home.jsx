import { StrictMode } from 'react';

// Components
import Header from '../components/header/header.jsx';
import Hero from '../components/hero/hero.jsx';
import Footer from '../components/footer/footer.jsx';

export default function Home(){
    return (
        <>
          <StrictMode>

                <Header/>
                
                <Hero />

                <Footer/> 
                
            </StrictMode>
        </>
    )
}