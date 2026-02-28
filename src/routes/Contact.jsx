// React
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// CSS
import "../../styles/pages/Contact.css";

export default function Contact() {
    useEffect(() => {
        document.title = "Contact - Task Loader";
    }, []);

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Contactez-nous</h1>
                    <p>
                        Une question, une suggestion ou besoin d'aide ? 
                        Notre équipe est là pour vous répondre.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="info-card main-contact">
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                        <h2>Envoyez-nous un email</h2>
                        <p className="contact-description">
                            Pour toute question, suggestion ou demande d'assistance,<br />
                            n'hésitez pas à nous contacter par email.
                        </p>
                        <a href="mailto:contact@taskloader.com" className="btn-email">
                            contact@taskloader.com
                        </a>
                        <span className="info-detail">Réponse sous 24-48 heures</span>
                    </div>

                    <div className="secondary-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                            </div>
                            <h3>Horaires de réponse</h3>
                            <p>Lundi - Vendredi</p>
                            <span className="info-detail">9h00 - 18h00 (CET)</span>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                            </div>
                            <h3>Besoin d'aide ?</h3>
                            <p>Centre d'aide disponible</p>
                            <span className="info-detail">
                                <Link to="/plan-du-site">Consultez notre plan du site</Link>
                            </span>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 11l3 3L22 4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                            </div>
                            <h3>Suggestions</h3>
                            <p>Améliorons Task Loader</p>
                            <span className="info-detail">Partagez vos idées avec nous</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}