// React
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS
import "../../styles/pages/Home.css";

export default function Home(){
	useEffect(() => {
		document.title = "Task Loader";
	}, []);

	return (
	<>
	<section className='hero'>
		<div className='hero-content'>
			<img src='../../../assets/pictures/visuel.png' alt="Visuel Kanban" />

			<div className='right'>
				<h2>Bienvenue !</h2>
				<p>Le Kanban, repensé pour aller à l’essentiel</p>
				<p>Libérez vous du chaos de la gestion de projet grâce à Task Loader</p>

				<Link className='discover-btn hover-btn' to="/board">
					<p>Commencer à l'utiliser maintenant! </p>
					<img src='../../assets/icon/right-arrow.png' />
				</Link>
			</div>
		</div>
	</section>

	<section className='homeContent'>
		<div className='homePresentation'>

			<div className='homeContentHeader'>
				<h2>Notre Produit</h2>
				<h3>Task Loader</h3>
				<img src='../../../assets/pictures/visuel.png' alt="Visuel Kanban" />
			</div>

			<div className='homePresentationArticle'>
				<article>
					<h4>Notre Objectif</h4>
					<p>
						Vous permettre de <strong>suivre l’avancement de vos projets</strong> en appliquant la méthode <strong>Kanban</strong>. 
						Avec <strong>Task Loader</strong>, vous pouvez organiser vos différentes tâches sous forme de <strong>listes verticales claires et structurées</strong>. 
						Gérez les <strong>deadlines</strong>, les <strong>descriptions</strong>, et profitez de nombreuses autres fonctionnalités. 
					</p>
				</article>

				<span className="vertical-line"></span>

				<article>
					<h4>Notre Philosophie</h4>
					<p>
						Vous proposer une <strong>solution simple, efficace et accessible</strong> pour gérer vos projets.  
						<strong> Pas de publicité. Pas de traqueurs. Pas de frais cachés. </strong>  
						Simplement vos projets, où vous voulez, quand vous voulez, gratuitement.  
						Nous sommes également <strong>à l’écoute de toutes nouvelles fonctionnalités</strong> afin de faire évoluer l’outil selon vos besoins réels.
					</p>
				</article>
			</div>
		</div>

		<div className='homeFunctionnality'>
			<div className='homeContentHeader'>
				<h2>Fonctionnalités</h2>
			</div>

			<div className='homeFunctionnalityContent'>
				<div className='grid'>
					<div className='homeFunctionnalityGrid'>
						<div className='functionnalityGridContent'>
							<img src="../../../assets/icon/iconCreate.png" alt="Icon Créer" />
							<h3>Créer</h3>
							<p>Créer autant de board que nécessaire pour vos projets</p>
						</div>
					</div>

					<div className='homeFunctionnalityGrid'>
						<div className='functionnalityGridContent'>
							<img src="../../../assets/icon/iconEdit.png" alt="Icon Éditer" />
							<h3>Éditer</h3>
							<p>Vous avez fait une erreur ? Pas de soucis. Vous pouvez tout éditer à n’importe quel moment</p>
						</div>
					</div>

					<div className='homeFunctionnalityGrid'>
						<div className='functionnalityGridContent'>
							<img src="assets/icon/iconPlanning.png" alt="Icon Plannifier" />
							<h3>Planifier</h3>
							<p>Planifiez vos tâches. Réorganisez les. Divisez les. Assignez les</p>
						</div>
					</div>

					<div className='gridBottom'>
						<div className='homeFunctionnalityGrid'>
							<div className='functionnalityGridContent'>
								<img src="../../assets/icon/iconSave.png" alt="Icon Sauvegarder" />
								<h3>Sauvegarder</h3>
								<p>Sauvegarder l’état de votre board et retournez-y quand vous voulez</p>
							</div>
						</div>

						<div className='homeFunctionnalityGrid'>
							<div className='functionnalityGridContent'>
								<img src="../../../assets/icon/iconShare.png" alt="Icon Partagez" />
								<h3>Partagez</h3>
								<p>Partagez à vos collaborateurs pour qu'ils puissent également y contribuer</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className='homeDemonstration'>
			<h3>Toujours pas convaincu ?</h3>
			<Link to={"/register"}>
				<button className='demo-btn hover-btn'>
					<div className='demo-btn-content'>
						<span>Accéder à la démo </span>gratuite<img className='iconLink' src='../../../assets/icon/IconLink.png' alt="Icon Link" />
					</div>
				</button>
			</Link>
		</div>

	</section>                
	</>
	);
}