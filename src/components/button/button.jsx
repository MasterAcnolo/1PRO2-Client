import './button.css';

import { Link } from "react-router-dom";

function Login_Sign_Buttons() {
    return(
    <>
        <div className='buttons'>
            <Link id="login" className='hover-btn' to="/login">Se connecter</Link>
            <Link id="sign-in" className='hover-btn' to="/register">Inscrivez vous gratuitement !</Link>
        </div>
    </>
);}


export {
    Login_Sign_Buttons
};