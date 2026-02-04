// Components
import Form from '../components/form/form.jsx';
import { useEffect } from 'react';

import {useUserIsLoggedRedirect} from '../../script/hooks/hooks.isLogged.js'

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