import './header.css';

import { Link } from "react-router-dom";

/* Components */
import {UserStateHeader} from '../userStateHeader/userStateHeader.jsx';
import {userIsLogged} from '../../../script/hooks/hooks.isLogged.js'
import HamburgerMenu from '../hamburger/hamburger.jsx';

function NavHeader() {

    const logged = userIsLogged();

    if (!logged) return null; 

    return (
        <>
        <nav>
            <Link to="/board">Vos Boards</Link>
            <Link to="/board/1">Créer un Board</Link>
            <Link to="/account">Compte</Link>
        </nav>
        </>
    );
}

function Header() {

    const logged = userIsLogged()

    return(
        <>
        <header>
            <Link to="/" className="title">TASKLOADER.</Link>

            {/* Suivant la taille de l'écran on affiche oui ou non les éléments */}
            {window.innerWidth > 1024
                ? (logged ? <NavHeader /> : null)
                : null}

            {window.innerWidth > 1024 ? <UserStateHeader/> : <HamburgerMenu /> }

        </header>
        </>
    );
}

export default Header;