// React
import { Link } from "react-router-dom";

// CSS
import './footer.css';

// Helpers
import { userIsLogged } from "../../../script/hooks/isLogged.hooks";


function Footer() {
    // Le hook retourne true si connecté, false sinon
    const isLogged = userIsLogged();

    return (
        <>
            <footer>
                <div className='container'>
                    <nav>
                        <h3>Boards</h3>
                        <Link to="/board">Vos Boards</Link>
                    </nav>
                    <nav>
                        <h3>Mon espace</h3>
                        <Link to="/account">Compte</Link>
                        {isLogged === false && (
                            <>
                                <Link to="/register">S'inscrire</Link>
                                <Link to="/login">Connexion</Link>
                            </>
                        )}
    					<Link to="/contact">Contact</Link>
                    </nav>
                    <nav>
                        <h3>Légal</h3>
                        <Link to="/vos-donnees">Vos Données</Link>
                        <Link to="/plan-du-site">Plan du Site</Link>
                        <Link to="/mentions-legales">Mentions Légales</Link>
                    </nav>
                </div>
                <p>Tous Droits Réservés © TaskLoader.</p>
            </footer>
        </>
    );
}

export default Footer;
