import { Link } from "react-router-dom";

import './footer.css';


function Footer() {
    return(
        <>
        <footer>
            <div className='container'>
                <nav>
                    <Link>Boards</Link>
                    <Link to="/board">Vos Boards</Link>
                    <Link>Créer un Board</Link>
                </nav>
                <nav>
                    <Link>Mon espace</Link>
                    <Link>Compte</Link>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/login">Connexion</Link>
                </nav>
                <nav>
                    <Link>Légal</Link>
                    <Link>Vos Données</Link>
                    <Link>Mentions Légales</Link>
                    <Link>Nous Contacter</Link>
                </nav>
            </div>
            <p>Tous Droits Réservés © TaskLoader.</p>
        </footer>
        </>
    );
}

export default Footer;
