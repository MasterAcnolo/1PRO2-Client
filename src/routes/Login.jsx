// React
import { useEffect } from 'react';

// Helpers
import { useUserIsLoggedRedirect } from '../../script/hooks/isLogged.hooks.js';

// Components
import Form from '../components/form/form.jsx';

export default function Login(){

    useUserIsLoggedRedirect('/board', true)

    useEffect(() => {
        document.title = "Task Loader | Connexion";
    }, []);

    return (
        <>
            <Form type="login" />
        </>
    );
}