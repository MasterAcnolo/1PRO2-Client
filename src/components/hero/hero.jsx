import './hero.css';


function Hero() {
    return(
        <>
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
        </>
    );
}

export default Hero;
