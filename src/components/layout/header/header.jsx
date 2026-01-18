import './header.css';

import { useState } from 'react';
import { Link } from "react-router-dom";

/* Components */
import {Login_Sign_Buttons} from '../../button/button.jsx';
import HamburgerMenu from './hamburger/hamburger.jsx';


function NavHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const menuOpen = isOpen || isHover;
    
    return (
        <div className="dropDownMenu"

            onMouseEnter={function(){setIsHover(true)}}
            onMouseLeave={function(){setIsHover(false)}}
        >

            <button
                type='button'
                onClick={() => setIsOpen(valeurInitiale => !valeurInitiale)} // toggle
            >
                Mon espace <span style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)' }} >►</span>

            </button>

            { menuOpen ?
                <ul className="content">
                    <Link to="/board">Mes Boards</Link>
                    <Link to="/board/1">Créer un board</Link>
                </ul> : ""
            }
        </div>
    );
}

function Header() {
    return(
        <>
        <header>
            <Link to="/" className="title">TASKLOADER.</Link>

            {window.innerWidth > 1024 ? <NavHeader/> :  "" }
            {window.innerWidth > 1024 ? <Login_Sign_Buttons/> : <HamburgerMenu /> }

        </header>
        </>
    );
}

export default Header;