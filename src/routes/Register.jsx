// React
import { useEffect } from 'react';

// Helpers
import { useUserIsLoggedRedirect } from '../../script/hooks/hooks.isLogged.js';

// Components
import Form from '../components/form/form.jsx';

export default function Register() {

    useUserIsLoggedRedirect('/', true)

    useEffect(() => {
        document.title = "Task Loader | Inscription"  ;
    }, []);

    return (
        <>
            <Form type="register" />
        </>
    );
}