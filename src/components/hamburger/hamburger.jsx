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

            <div className='hamburger-avatar'>
              <h1>{userData.username}</h1>
              <img src="../../../assets/default.jpg" alt="Icon d'Avatar" />
            </div>

            <div className='hamburger-contentText'>
              <h4>Boards</h4>
              <p className='hover-btn'><Link>Vos Board</Link></p>
              <p className='hover-btn'><Link>Créer un Board</Link></p>
            </div>
            
            <span className='horizontal-line'></span>

            <div className='hamburger-contentText'>
              <h4>Mon Espace</h4>
              <p className='hover-btn'><Link>S'inscrire</Link></p>
              <p className='hover-btn'><Link>Connexion</Link></p>
            </div>

              <span className='horizontal-line'></span>

            {/* A voir si on le garde dans le hamburger */}
            <div className='hamburger-contentText'>
              <h4>Légal</h4>
              <p className='hover-btn'><Link>Vos Données</Link></p>
              <p className='hover-btn'><Link>Mentions Légales</Link></p>
            </div>

            <div className='hamburger-disconnect hover-btn'><p><Link>Déconnexion</Link></p></div>
          </div>
        </div>
      </div> : ""
      }

    </>
  );
}

export default HamburgerMenu;
