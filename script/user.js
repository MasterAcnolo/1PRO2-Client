import { getToken } from "./helpers/getToken.helpers.js";
import { showToast } from '../src/components/toast/toast.jsx';
import { API_BASE_URL } from "./variables";

async function loginRegisterUser(data, method) {
  const endpoint = method === "register" ? "register" : "";

  const payload = method === "register" // Suivant la méthode on construit un payload custom
    ? { username: data.username, email: data.email, password: data.password }
    : { identifier: data.email, password: data.password };

  const res = await fetch(`${API_BASE_URL}/auth/local/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    showToast("Service Temporairement Indisponible", "error", true)    
  }

  showToast((method === "register" ? "Inscription Réussie" : "Connexion Réussie"), "success", true); // TOAST avec persist=true

  if (data.rememberMe) {
    document.cookie = `token=${json.jwt}; path=/; max-age=604800`; // Cookie de max une semaine
  } else {
    sessionStorage.setItem("token", json.jwt);
  }

  return json;
}

async function getUserInfo() {
    const TOKEN = getToken();

    if (!TOKEN) {
        return false;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/users/me`, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        if (!res.ok) {
            throw new Error(`Erreur: ${res.status}`);
        }

        const userInfo = await res.json();
        return userInfo;

    } catch (err) {
        showToast("Service Temporairement Indisponible", "error", true)
        return false;
    }
}

function disconnectUser(){
    
    const TOKEN = getToken();

    if(!isLogged){
        return "User was not connected";

    } else{
        if(TOKEN){
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            sessionStorage?.removeItem("token");
            
            // Redirection vers la page d'accueil
            window.location.href = '/';
            showToast("Déconnexion Réussie", "info", true)

            return true
        }
    }

}

async function isLogged() {
    const user = await getUserInfo();
    return !!user; // true si user existe, false sinon (transformation extrême)
}

export {
    loginRegisterUser,
    getUserInfo,
    disconnectUser,

    isLogged
}