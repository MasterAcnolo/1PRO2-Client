// React
import { useEffect, useState } from 'react';

// CSS
import '../../styles/pages/account.css';

// Script
import { API_BASE_URL } from '../../script/variables.js';
import { getUserInfo } from '../../script/user.js';

// Helpers
import { useUserIsLoggedRedirect } from '../../script/hooks/isLogged.hooks.js';
import { getToken } from '../../script/helpers/getToken.helpers.js';

// Components
import { showToast } from '../components/toast/toast.jsx';

// Assets
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
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        document.title = "Task Loader | Mon Compte";
        
        async function fetchUserData() {
            const userData = await getUserInfo();
            if (userData) {
                setUsername(userData.username);
                setUserId(userData.id);
            }
        }
        fetchUserData();
    }, []);

    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const passwordsDontMatch = newPassword && confirmPassword && newPassword !== confirmPassword;

    async function handlePasswordSubmit(e) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showToast('Les mots de passe ne correspondent pas', 'error');
            return;
        }

        const TOKEN = getToken();

        try {
            const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
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

            if (!res.ok) {
                if (json.error?.message === "The provided current password is invalid") {
                    showToast("Le mot de passe actuel est invalide", 'error');
                } else {
                    showToast(json.error?.message || "Erreur lors du changement de mot de passe", 'error');
                }
                throw new Error(json.error?.message || "Erreur");
            }

            showToast('Mot de passe modifié avec succès', 'success');
            
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Erreur lors du changement de mot de passe:', error.message);
        }
    }

    async function handleDeleteAccount() {
        if (!userId) return;

        if (!window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) return;

        const TOKEN = getToken();

        try {
            const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }
            });

            const json = await res.json();

            if (!res.ok) {
                showToast(json.error?.message || "Erreur lors de la suppression", 'error');
                throw new Error(json.error?.message || "Erreur");
            }

            showToast('Compte supprimé avec succès', 'info', true);
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            sessionStorage?.removeItem("token");
            window.location.href = '/';
        } catch (error) {
            console.error('❌ Erreur lors de la suppression du compte:', error.message);
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
                            minLength={10}
                            required
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
                            minLength={10}
                            className={passwordsMatch ? 'input-success' : passwordsDontMatch ? 'input-error' : ''}
                            required
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
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={10}
                            className={passwordsMatch ? 'input-success' : passwordsDontMatch ? 'input-error' : ''}
                            required
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
                    <button type="button" className="deleteBtn" onClick={handleDeleteAccount}>Supprimer mon compte</button>
                </div>
            </div>
        </section>
    );
}
