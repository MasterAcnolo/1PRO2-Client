import './button.css';
import { Link } from "react-router-dom";
import { getAuthStatus } from '../../../script/auth';
import { useState, useEffect } from 'react';

function Login_Sign_Buttons() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const data = await getAuthStatus();
            if (data) setUserData(data);
            setLoading(false); // fini le chargement
        }
        fetchUser();
    }, []);

    if (loading) return null;

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
                <Link className='avatar' to="/"><img src='../../../assets/default.jpg'/></Link>
            </div>
        );
    }
}

export { Login_Sign_Buttons };
