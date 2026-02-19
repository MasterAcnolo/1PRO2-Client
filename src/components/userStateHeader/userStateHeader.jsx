// CSS
import './userStateHeader.css';

// React
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

// Script
import { getUserInfo, disconnectUser } from '../../../script/user';

// Helpers
import { useClickOutside } from '../../../script/hooks/hooks.clickOutside';

function UserStateHeader() {
    const [userData, setUserData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserInfo();
            if (data) setUserData(data);
        }
        fetchUser();
    }, []);

    useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);


    if (!userData) {
        return (
            <div className='buttons'>
                <Link id="login" className='hover-btn' to="/login">Se connecter</Link>
                <Link id="sign-in" className='hover-btn' to="/register">Inscrivez vous gratuitement !</Link>
            </div>
        );
    } else {
        return (
            <div className='userHeader'>
                <Link className='username' to="/">
                    <p>{userData.username}</p>
                </Link>
                
                <div ref={dropdownRef} className='avatar-container'>
                    <div className='avatar' onClick={() => setIsOpen(prev => !prev)}>
                        <img src='../../../assets/default.jpg' alt="avatar" />
                    </div>

                    {isOpen && (
                        <div className='dropDown-content'>
                            <Link to="/account">Mon Espace</Link>
                            <Link to="/board">Vos Boards</Link>
                            <p className='delete' onClick={async () => {
                                const status = await disconnectUser();
                                if (status) {
                                    setUserData(null);
                                } else {
                                    console.log("Erreur pendant la déconnexion");
                                }
                            }}>Déconnexion</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export { UserStateHeader };
