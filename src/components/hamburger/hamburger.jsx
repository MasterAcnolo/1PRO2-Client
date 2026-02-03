import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUserInfo, disconnectUser } from '../../../script/user';

import hamburgerIcon from '../../../assets/icon/hamburger.png';
import crossIcon from '../../../assets/icon/cross.png';

import './hamburger.css';

function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(valeur => !valeur);
    document.body.style.overflow = !isActive ? 'hidden' : 'auto';
  };

  const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserInfo();
            if (data) setUserData(data);
        }
        fetchUser();
    }, []);

  return (
    <>
      <img
        src={isActive ? crossIcon : hamburgerIcon}
        id="hamburger-button"
        alt=""
        aria-label="Open menu"
        onClick={toggleMenu}
        className={isActive ? 'fade' : ''}
      />

      {isActive ? 
      <div className='hamburger-overlay'> 
        <div className='hamburger-backgroundContent'>
          <div className='hamburger-content'>

          { userData ? 
            <div className='hamburger-avatar'>
              <h2>{ userData ? userData.username : "Utilisateur"}</h2>
              <img src="../../../assets/default.jpg" alt="Icon d'Avatar" />
            </div> : ""
          }
            <div className='hamburger-contentText'>
              <h4>Boards</h4>
              <Link to="/board">Vos Boards</Link>
            </div>
            
            <span className='horizontal-line'></span>

            { !userData ? 
              <div className='hamburger-contentText'>
                <h4>Mon Espace</h4>
                <Link to="/register">S'inscrire</Link>
                <Link to="/login">Connexion</Link>
              </div>  : ""
            } 
            { userData ? 
              <div className='hamburger-contentText'>
                <h4>Mon Espace</h4>
                <Link to="/account">Compte</Link>
              </div> : ""}
            { !userData ? <span className='horizontal-line'></span> : ""}

            <div className='hamburger-contentText'>
              <h4>Légal</h4>
              <Link>Vos Données</Link>
              <Link>Mentions Légales</Link>
            </div>

            { userData ? <div className='hamburger-disconnect'><Link>Déconnexion</Link></div> : ""}
          </div>
        </div>
      </div> : ""
      }

    </>
  );
}

export default HamburgerMenu;
