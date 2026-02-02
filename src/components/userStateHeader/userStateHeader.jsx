import './userStateHeader.css'
;
import { Link } from "react-router-dom";
import { getUserInfo, disconnectUser } from '../../../script/user';
import { useState, useEffect } from 'react';

function UserStateHeader() {
    const [userData, setUserData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserInfo();
            if (data) setUserData(data);
        }
        fetchUser();
    }, []);


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
                
                <div className='avatar' onClick={() => setIsOpen(valeurInitiale => !valeurInitiale)}><img src='../../../assets/default.jpg'/></div>

                <div className='dropDown'>
                    <div className='dropDown-content link' style={{display: `${isOpen ? "flex" : "none"}`, marginTop: "50px", marginRight: "15px"}}>

                        <Link to="/">Mon Espace</Link>
                        <Link to="/board">Vos Boards</Link>
                        <p id='disconnect' onClick={
                            async function(){
                                const status = await disconnectUser();
                                if (status === true) {
                                    setUserData(null);
                                } else {
                                    console.log("Erreur pendant la déconnexion");
                                }
                            }
                        }>Déconnexion</p>

                    </div>
                </div>
            </div>
        );
    }
}

export { UserStateHeader };
