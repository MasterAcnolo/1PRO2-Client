import './header.css';

import { Link } from "react-router-dom";

/* Components */
import {UserStateHeader} from '../userStateHeader/userStateHeader.jsx';
import {useIsLogged} from '../../../script/hooks/hooks.isLogged.js'
import HamburgerMenu from '../hamburger/hamburger.jsx';

function NavHeader() {

    const logged = useIsLogged();

    if (!logged) return null; 

    return (
        <>
        <nav>
            <Link to="/board">Vos Boards</Link>
            <Link to="/board/1">Créer un Board</Link>
        </nav>
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
            {window.innerWidth > 1024 ? <UserStateHeader/> : <HamburgerMenu /> }

        </header>
        </>
    );
}

export default Header;