import { StrictMode } from 'react';

// Components
import Header from '../components/layout/header/header.jsx';
import Footer from '../components/layout/footer/footer.jsx';
import Form from '../components/form/form.jsx';

export default function Login(){
    return (
        <>
          <StrictMode>

                <Header/>

                <Form type="login" />

                <Footer/>
                
            </StrictMode>
        </>
    );
}