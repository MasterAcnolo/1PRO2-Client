// Components
import Form from '../components/form/form.jsx';


import {useUserIsLoggedRedirect} from '../../script/hooks/hooks.isLogged.js'


export default function Register() {

    useUserIsLoggedRedirect('/', true)

    return (
        <>
            <Form type="register" />
        </>
    );
}