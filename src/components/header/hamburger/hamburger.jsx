import { useState } from 'react';

import hamburgerIcon from '../../../../assets/icon/hamburger.png';
import crossIcon from '../../../../assets/icon/cross.png';

import './hamburger.css';

function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(valeur => !valeur);
    document.body.style.overflow = !isActive ? 'hidden' : 'auto';
  };

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

      {isActive ? <div className='hamburger-overlay'> </div> : ""}

    </>
  );
}

export default HamburgerMenu;
