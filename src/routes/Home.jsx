import { StrictMode } from 'react';

// Styles
import "../../styles/pages/Home.css";

export default function Home(){
    return (
        <>
          <StrictMode>
                
                <section className='hero'>
                    <div className='hero-content'>
                        <img src='../../../assets/pictures/visuel.png' alt="Visuel Kanban" />

                        <div className='right'>
                            <h2>Bienvenue !</h2>
                            <p>Le Kanban, repensé pour aller à l’essentiel</p>
                            <p>Libérez vous du chaos de la gestion de projet grâce à Task Loader</p>
                        </div>
                    </div>
                </section>

                <section className='homeContent'>
                    <div className='homePresentation'>
                        <h3>Notre Objectif</h3>
                        <p>Vous permettre de suivre l’avancement de vos projets en suivant la méthode Kanban. 
                        Avec Task Loader vous pouvez organisez vos différentes tâches sous forme de liste verticale. 
                        Assignez des personnes, gérer les deadlines,  et bien d’autres fonctionnalités ! 
                        Consultez la liste des fonctionnalités <span>ici</span></p>
                        
                        <h3>Notre Philosophie</h3>
                        <p>Vous proposez une solution simple pour gérer au mieux vos projets.
                        Pas de pub. Pas de traqueurs. Pas de frais. 
                        Simplement vos projets où vous voulez, quand vous voulez et gratuitement !</p>
                    </div>
                    <div className='homeFunctionnality'></div>
                </section>
                
            </StrictMode>
        </>
    );
}