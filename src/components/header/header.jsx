import './header.css';

import { Link } from "react-router-dom";

/* Components */
import {UserStateHeader} from '../userStateHeader/userStateHeader.jsx';
import HamburgerMenu from '../hamburger/hamburger.jsx';

function Header() {

    return(
        <>
        <header>
            <Link to="/" className="title">TASKLOADER.</Link>

            {window.innerWidth > 1024 ? <UserStateHeader/> : <HamburgerMenu /> }

        </header>
        </>
    );
}

export default Header;