// React
import { useEffect } from 'react';

// CSS
import "../../styles/pages/Legal.css";

export default function Legal() {
	useEffect(() => {
		document.title = "Mentions Légales - Task Loader";
	}, []);

	return (
		<div className="legal-page">
			<div className="legal-container">
				<h1>Mentions Légales</h1>
				
				<section>
					<h2>Éditeur du site</h2>
					<p>Le site Task Loader est édité par Task Loader.</p>
					<p>Projet étudiant</p>
					<p>Email : contact@taskloader.com</p>
				</section>

				<section>
					<h2>Hébergement</h2>
					<p>
						Le site est hébergé conformément aux dispositions de la loi n° 2004-575 
						du 21 juin 2004 pour la confiance dans l'économie numérique.
					</p>
					<p>Les serveurs sont localisés en Union Européenne.</p>
				</section>

				<section>
					<h2>Propriété intellectuelle</h2>
					<p>
						L'ensemble du contenu de ce site (structure, textes, logos, images, éléments graphiques) 
						est la propriété exclusive de Task Loader, sauf mention contraire.
					</p>
					<p>
						Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
						de ces différents éléments est strictement interdite sans l'accord express par écrit 
						de Task Loader.
					</p>
					<p>
						Cette représentation ou reproduction, par quelque procédé que ce soit, constitue 
						une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la 
						propriété intellectuelle.
					</p>
				</section>

				<section>
					<h2>Protection des données personnelles</h2>
					<p>
						Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion 
						de votre compte utilisateur et à l'amélioration de nos services.
					</p>
					<p>
						Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée 
						et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, 
						vous bénéficiez d'un droit d'accès, de rectification, de portabilité et d'effacement 
						de vos données ou encore de limitation du traitement.
					</p>
					<p>
						Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des 
						données vous concernant.
					</p>
					<p>Pour exercer ces droits : contact@taskloader.com</p>
				</section>

				<section>
					<h2>Cookies et traceurs</h2>
					<p>
						Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement 
						du service (authentification, gestion de session).
					</p>
					<p>
						Conformément à l'article 82 de la loi Informatique et Libertés modifiée, 
						aucun cookie publicitaire, de mesure d'audience ou de traçage n'est déployé 
						sur ce site.
					</p>
				</section>

				<section>
					<h2>Limitation de responsabilité</h2>
					<p>
						Task Loader met tout en œuvre pour offrir aux utilisateurs des informations 
						et des outils disponibles et vérifiés, mais ne saurait être tenu pour responsable 
						des erreurs, d'une absence de disponibilité des fonctionnalités et/ou de la 
						présence de virus sur son site.
					</p>
					<p>
						L'utilisateur est responsable de la protection de ses données, logiciels et matériels 
						contre toute atteinte.
					</p>
					<p>
						Task Loader ne pourra être tenu responsable des dommages directs ou indirects qui 
						pourraient résulter de l'accès au site ou de l'utilisation de celui-ci.
					</p>
				</section>

				<section>
					<h2>Droit applicable et juridiction compétente</h2>
					<p>
						Les présentes mentions légales sont régies par le droit français.
					</p>
					<p>
						En cas de litige et à défaut d'accord amiable, le litige sera porté devant 
						les tribunaux français conformément aux règles de compétence en vigueur.
					</p>
				</section>

				<div className="last-updated">
					<p>Dernière mise à jour : Février 2026</p>
				</div>
			</div>
		</div>
	);
}
