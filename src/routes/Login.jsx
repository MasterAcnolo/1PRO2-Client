// React
import { useEffect } from 'react';

// Helpers
import { useUserIsLoggedRedirect } from '../../script/hooks/hooks.isLogged.js';

// Components
import Form from '../components/form/form.jsx';

export default function Login(){

    useUserIsLoggedRedirect('/', true)

    useEffect(() => {
        document.title = "Task Loader | Connexion";
    }, []);

    return (
        <>
            <Form type="login" />
        </>
    );
}