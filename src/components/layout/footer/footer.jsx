import { Link } from "react-router-dom";

import './footer.css';


function Footer() {
    return(
        <>
        <footer>
            <div className='container'>
                <nav>
                    <h3>Boards</h3>
                    <Link to="/board">Vos Boards</Link>
                    <Link>Créer un Board</Link>
                </nav>
                <nav>
                    <h3>Mon espace</h3>
                    <Link>Compte</Link>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/login">Connexion</Link>
                </nav>
                <nav>
                    <h3>Légal</h3>
                    <Link>Vos Données</Link>
                    <Link>Plan du Site</Link>
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
