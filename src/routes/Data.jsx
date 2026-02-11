import { useEffect } from 'react';

// Styles
import "../../styles/pages/Legal.css";

export default function Data() {
	useEffect(() => {
		document.title = "Vos Données - Task Loader";
	}, []);

	return (
		<div className="legal-page">
			<div className="legal-container">
				<h1>Vos Données</h1>

				<section>
					<h2>Responsable du traitement</h2>
					<p>
						Task Loader est responsable du traitement de vos données personnelles 
						au sens du Règlement Général sur la Protection des Données (RGPD).
					</p>
					<p>Contact : contact@taskloader.com</p>
				</section>

				<section>
					<h2>Données collectées</h2>
					<p>
						Nous collectons uniquement les données strictement nécessaires au fonctionnement 
						de notre service :
					</p>
					<p>
						<strong>Données de compte :</strong> Nom d'utilisateur, adresse email, 
						mot de passe (hashé et encodé)
					</p>
					<p>
						<strong>Données de contenu :</strong> Boards, colonnes, cartes et tâches 
						que vous créez
					</p>
				</section>

				<section>
					<h2>Finalités du traitement</h2>
					<p>Vos données sont traitées exclusivement pour :</p>
					<p>La création et la gestion de votre compte utilisateur</p>
					<p>Le respect de nos obligations légales</p>
					<p>
						<strong>Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à 
						des fins commerciales.</strong>
					</p>
				</section>

				<section>
					<h2>Base légale</h2>
					<p>
						Le traitement de vos données repose sur l'exécution du contrat vous liant à 
						Task Loader (fourniture du service) et sur votre consentement pour certaines 
						fonctionnalités optionnelles.
					</p>
				</section>

				<section>
					<h2>Durée de conservation</h2>
					<p>
						Vos données personnelles sont conservées pendant toute la durée de vie de 
						votre compte.
					</p>
					<p>
						En cas de suppression de votre compte, vos données sont effacées de nos 
						systèmes dans un délai maximum de 30 jours, sauf obligation légale de 
						conservation.
					</p>
				</section>

				<section>
					<h2>Sécurité des données</h2>
					<p>
						Nous mettons en œuvre toutes les mesures techniques et organisationnelles 
						appropriées pour garantir la sécurité de vos données :
					</p>
					<p>Encodagedes mots de passe</p>
					<p>Connexions sécurisées HTTPS</p>
					<p>Authentification par tokens JWT</p>
					<p>Sauvegardes régulières et chiffrées</p>
					<p>Accès restreint aux données sur base du besoin d'en connaître</p>
				</section>

				<section>
					<h2>Vos droits (RGPD)</h2>
					<p>
						Conformément au RGPD et à la loi Informatique et Libertés, vous disposez 
						des droits suivants :
					</p>
					<p>
						<strong>Droit d'accès :</strong> Obtenir la confirmation que vos données sont 
						ou ne sont pas traitées et, le cas échéant, accès auxdites données
					</p>
					<p>
						<strong>Droit de rectification :</strong> Faire corriger vos données inexactes 
						ou incomplètes
					</p>
					<p>
						<strong>Droit à l'effacement :</strong> Demander la suppression de vos données 
						dans certains cas
					</p>
					<p>
						<strong>Droit à la portabilité :</strong> Recevoir vos données dans un format 
						structuré et couramment utilisé
					</p>
					<p>
						<strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données 
						pour des motifs légitimes
					</p>
					<p>
						<strong>Droit à la limitation :</strong> Obtenir la limitation du traitement dans 
						certains cas
					</p>
					<p>
						Pour exercer ces droits, contactez-nous à : <strong>contact@taskloader.com</strong>
					</p>
					<p>
						Vous disposez également du droit d'introduire une réclamation auprès de la CNIL 
						(Commission Nationale de l'Informatique et des Libertés).
					</p>
				</section>

				<section>
					<h2>Cookies et traceurs</h2>
					<p>
						Task Loader utilise uniquement des cookies strictement nécessaires au 
						fonctionnement du service :
					</p>
					<p>Token d'authentification : Pour maintenir votre session sécurisée</p>
					<p>
						<strong>Aucun cookie publicitaire, de mesure d'audience tierce ou de traçage 
						comportemental n'est utilisé.</strong>
					</p>
				</section>

				<section>
					<h2>Transferts de données</h2>
					<p>
						Vos données sont stockées sur des serveurs localisés en Union Européenne.
					</p>
					<p>
						Elles ne font l'objet d'aucun transfert hors de l'Union Européenne.
					</p>
				</section>

				<section>
					<h2>Modifications de la politique</h2>
					<p>
						Nous nous réservons le droit de modifier cette politique de protection des 
						données à tout moment.
					</p>
					<p>
						Toute modification sera publiée sur cette page avec indication de la date 
						de dernière mise à jour.
					</p>
				</section>

				<div className="last-updated">
					<p>Dernière mise à jour : Février 2026</p>
				</div>
			</div>
		</div>
	);
}
