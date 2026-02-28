// React
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// CSS
import "../../../styles/pages/error.css";

export default function Forbidden() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Task Loader | 403";
    }, []);

    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-code">403</div>
                <h1>Accès refusé</h1>
                <p className="error-description">
                    Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
                </p>
                <div className="error-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="error-svg">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                        <rect x="70" y="85" width="60" height="45" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <path d="M80 85 V70 A20 20 0 0 1 120 70 V85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="100" cy="110" r="6" fill="currentColor"/>
                        <rect x="97" y="110" width="6" height="12" fill="currentColor"/>
                    </svg>
                </div>
                <div className="error-actions">
                    <button onClick={() => navigate(-1)} className="btn-secondary">
                        Retour
                    </button>
                    <Link to="/" className="btn-primary">
                        Retour à l'accueil
                    </Link>
                </div>
                <div className="error-help">
                    <p>Que faire ?</p>
                    <ul>
                        <li><Link to="/login">Connectez-vous</Link> si vous avez un compte</li>
                        <li><Link to="/register">Créez un compte</Link> pour accéder à cette fonctionnalité</li>
                        <li>Contactez-nous à <a href="mailto:contact@taskloader.com">contact@taskloader.com</a> si le problème persiste</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}