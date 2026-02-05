import { useEffect, useState } from 'react';
import { useUserIsLoggedRedirect } from '../../script/hooks/hooks.isLogged.js';
import { getUserInfo } from '../../script/user.js';
import { getToken } from '../../script/helpers/getToken.js';
import '../../styles/pages/account.css';

import eyeOpen from '../../assets/icon/eyeOpen.svg';
import eyeClosed from '../../assets/icon/eyeClosed.png';

export default function Account() {
    useUserIsLoggedRedirect('/login', false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        document.title = "Task Loader | Mon Compte";
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            const userData = await getUserInfo();
            if (userData) {
                setUsername(userData.username || '');
            }
        }
        fetchUserData();
    }, []);

    // Vérification de la correspondance des mots de passe
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const passwordsDontMatch = newPassword && confirmPassword && newPassword !== confirmPassword;

    // Gestion de la soumission du formulaire de mot de passe
    async function handlePasswordSubmit(e) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.error('Les mots de passe ne correspondent pas');
            // TODO: Afficher un toast d'erreur
            return;
        }

        const TOKEN = getToken();
        const API_URL = "http://localhost:1337/api";

        try {
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    currentPassword,
                    password: newPassword,
                    passwordConfirmation: confirmPassword
                })
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.error?.message || "Erreur lors du changement de mot de passe");

            console.log('Mot de passe changé avec succès');
            // Réinitialiser les champs
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // TODO: Afficher un toast de succès
        } catch (error) {
            console.error('Erreur:', error.message);
            // TODO: Afficher un toast d'erreur
        }
    }



    return (
        <section className="accountBackground">
            <div className="accountContent">
                <h1>Rebonjour{username && `, ${username}`} !</h1>

                <form className="accountForm" onSubmit={handlePasswordSubmit}>
                    <h2>Modifier le Mot de Passe</h2>
                    
                    <div className="emailInput">
                        <input 
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Mot de passe actuel"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="toggleEmail"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            <img src={showCurrentPassword ? eyeOpen : eyeClosed} alt="Toggle password visibility" />
                        </button>
                    </div>

                    <div className="emailInput">
                        <input 
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Nouveau mot de passe"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={passwordsMatch ? 'input-success' : passwordsDontMatch ? 'input-error' : ''}
                        />
                        <button 
                            type="button" 
                            className="toggleEmail"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            <img src={showNewPassword ? eyeOpen : eyeClosed} alt="Toggle password visibility" />
                        </button>
                    </div>

                    <div className="emailInput">
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmer"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={passwordsMatch ? 'input-success' : passwordsDontMatch ? 'input-error' : ''}
                        />
                        <button 
                            type="button" 
                            className="toggleEmail"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="Toggle password visibility" />
                        </button>
                    </div>

                    <button type="submit" className="formBtn">Modifier</button>
                </form>

                <div className="dangerZone">
                    <h2>Zone de Danger</h2>
                    <p>La suppression de votre compte est irréversible</p>
                    <button type="button" className="deleteBtn">Supprimer mon compte</button>
                </div>
            </div>
        </section>
    );
}
