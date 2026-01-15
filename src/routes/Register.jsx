import { StrictMode } from 'react';

// Components
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import Form from '../components/form/form.jsx';

export default function Register(){
    return (
        <>
          <StrictMode>

                <Header/>

                <Form type="register" />

                <Footer/>
                
            </StrictMode>
        </>
    );
}