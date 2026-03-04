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

            <div className="desktop-only">
                <UserStateHeader/>
            </div>
            <div className="mobile-only">
                <HamburgerMenu />
            </div>

        </header>
        </>
    );
}

export default Header;