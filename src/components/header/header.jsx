// CSS
import './header.css';

// React
import { Link } from "react-router-dom";

// Components
import { UserStateHeader } from '../userStateHeader/userStateHeader.jsx';
import HamburgerMenu from '../hamburger/hamburger.jsx';

function Header() {

    return(
        <>
        <header>
            <Link to="/" className="title">TASKLOADER.</Link>

            {window.innerWidth > 1024 ? <UserStateHeader/> : <HamburgerMenu /> } {/* Si on est en mobile, on affiche le menu hamburger*/}

        </header>
        </>
    );
}

export default Header;