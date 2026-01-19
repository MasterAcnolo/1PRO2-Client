import './header.css';

import { Link } from "react-router-dom";

/* Components */
import {Login_Sign_Buttons} from '../../button/button.jsx';
import HamburgerMenu from './hamburger/hamburger.jsx';

function NavHeader() {

    
    return (
        <>
        <Link to="/board">Vos Boards</Link>
        <Link to="/board/1">Créer un Board</Link>
        </>
    );
}

function Header() {
    return(
        <>
        <header>
            <Link to="/" className="title">TASKLOADER.</Link>

            {/* Suivant la taille de l'écran on affiche oui ou non les éléments */}
            {window.innerWidth > 1024 ? <NavHeader/> :  "" }
            {window.innerWidth > 1024 ? <Login_Sign_Buttons/> : <HamburgerMenu /> }

        </header>
        </>
    );
}

export default Header;