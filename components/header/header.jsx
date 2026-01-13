import './Header.css';

function Header() {
    return(
        <>
        <header>
            <h2>TASKLOADER.</h2>
            <div className='buttons'>
                <button id="login">Se connecter</button>
                <button id="sign-in">Inscrivez vous gratuitement !</button>
            </div>
        </header>
        </>
    );
}

export default Header;