// React
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// CSS
import "./Error.css";

export default function UnknownError() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Erreur - Task Loader";
    }, []);

    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-code">?</div>
                <h1>Erreur inconnue</h1>
                <p className="error-description">
                    Une erreur inattendue s'est produite. Nos équipes ont été informées et travaillent à résoudre le problème.
                </p>
                <div className="error-illustration">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="error-svg">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                        <circle cx="75" cy="80" r="5" fill="currentColor"/>
                        <circle cx="125" cy="80" r="5" fill="currentColor"/>
                        <path d="M75 110 Q100 120 125 110" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M100 50 Q100 40 95 35 M100 50 Q100 40 105 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="error-actions">
                    <button onClick={() => window.location.reload()} className="btn-primary">
                        Recharger la page
                    </button>
                    <button onClick={() => navigate(-1)} className="btn-secondary">
                        Retour
                    </button>
                    <Link to="/" className="btn-secondary">
                        Accueil
                    </Link>
                </div>
                <div className="error-help">
                    <p>Que s'est-il passé ?</p>
                    <ul>
                        <li>Une erreur technique est survenue sur nos serveurs</li>
                        <li>Le problème est temporaire dans la plupart des cas</li>
                        <li>Si l'erreur persiste, contactez-nous à <a href="mailto:contact@taskloader.com">contact@taskloader.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}