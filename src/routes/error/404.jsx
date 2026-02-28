// React
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS
import "./Error.css";

export default function NotFound() {
    useEffect(() => {
        document.title = "Task Loader | 404";
    }, []);

    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-code">404</div>
                <h1>Page non trouvée</h1>
                <p className="error-description">
                    Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <div className="error-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="error-svg">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                        <path d="M70 85 Q100 115 130 85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="75" cy="75" r="5" fill="currentColor"/>
                        <circle cx="125" cy="75" r="5" fill="currentColor"/>
                    </svg>
                </div>
                <div className="error-actions">
                    <Link to="/" className="btn-primary">
                        Retour à l'accueil
                    </Link>
                    <Link to="/board" className="btn-secondary">
                        Mes Boards
                    </Link>
                </div>
                <div className="error-help">
                    <p>Besoin d'aide ?</p>
                    <ul>
                        <li>Vérifiez l'URL saisie</li>
                        <li>Consultez le <Link to="/plan-du-site">plan du site</Link></li>
                        <li>Contactez-nous à <a href="mailto:contact@taskloader.com">contact@taskloader.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}