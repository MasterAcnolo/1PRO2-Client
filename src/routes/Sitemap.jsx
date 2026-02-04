import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Styles
import "../../styles/pages/Legal.css";

export default function Sitemap() {
	useEffect(() => {
		document.title = "Plan du Site - Task Loader";
	}, []);

	return (
		<div className="legal-page">
			<div className="legal-container">
				<h1>Plan du Site</h1>
				<p>
					Navigation complète de Task Loader - Votre outil de gestion de projet Kanban
				</p>

				<section>
					<h2>Pages principales</h2>
					<ul>
						<li>
							<Link to="/">Accueil</Link>
							<p>Présentation de Task Loader et de ses fonctionnalités</p>
						</li>
						<li>
							<Link to="/board">Mes Boards</Link>
							<p>Accès à tous vos tableaux Kanban et création de nouveaux projets</p>
						</li>
					</ul>
				</section>

				<section>
					<h2>Gestion de compte</h2>
					<ul>
						<li>
							<Link to="/login">Connexion</Link>
							<p>Connectez-vous à votre espace personnel</p>
						</li>
						<li>
							<Link to="/register">Inscription</Link>
							<p>Créez votre compte gratuitement en quelques secondes</p>
						</li>
						<li>
							<Link to="/account">Mon Compte</Link>
							<p>Gérez vos informations personnelles et paramètres</p>
						</li>
					</ul>
				</section>

				<section>
					<h2>Fonctionnalités</h2>
					<p>Création et gestion de boards Kanban personnalisés</p>
					<p>Organisation en colonnes pour suivre l'avancement de vos tâches</p>
					<p>Ajout et modification de cartes pour détailler vos tâches</p>
					<p>Interface intuitive et responsive pour tous vos appareils</p>
				</section>

				<section>
					<h2>Informations légales</h2>
					<ul>
						<li>
							<Link to="/mentions-legales">Mentions Légales</Link>
							<p>Éditeur, hébergement, propriété intellectuelle et responsabilités</p>
						</li>
						<li>
							<Link to="/vos-donnees">Vos Données</Link>
							<p>Politique de confidentialité et protection de vos données personnelles (RGPD)</p>
						</li>
						<li>
							<Link to="/plan-du-site">Plan du Site</Link>
							<p>Cette page - Vue d'ensemble de la structure du site</p>
						</li>
					</ul>
				</section>

				<section>
					<h2>Contact</h2>
					<p>Email : contact@taskloader.com</p>
					<p>
						Pour toute question, suggestion ou demande d'assistance, 
						n'hésitez pas à nous contacter.
					</p>
				</section>

				<div className="last-updated">
					<p>Dernière mise à jour : Février 2026</p>
				</div>
			</div>
		</div>
	);
}
