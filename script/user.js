import { getToken } from "./helpers/getToken";

async function loginRegisterUser(data, method) {
  const API_URL = "http://localhost:1337/api";
  const endpoint = method === "register" ? "register" : "";

  const payload = method === "register" // Suivant la méthode on construit un payload custom
    ? { username: data.username, email: data.email, password: data.password }
    : { identifier: data.email, password: data.password };

  const res = await fetch(`${API_URL}/auth/local/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

  console.log(method === "register" ? "Inscription Réussie" : "Connexion Réussie"); // TOAST ICI

  if (data.rememberMe) {
    document.cookie = `token=${json.jwt}; path=/; max-age=604800`; // Cookie de max une semaine
    console.log("Token mis dans le cookie");

  } else {
    sessionStorage.setItem("token", json.jwt);
    console.log("Token mis dans le sessionStorage");
  }

  return json;
}

async function getUserInfo() {
    const TOKEN = getToken();

    if (!TOKEN) {
        console.log("Pas de token trouvé");
        return false;
    }

    const API_URL = "http://localhost:1337/api";

    try {
        const res = await fetch(`${API_URL}/users/me`, {
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
        console.error(err.message);
        return false;
    }
}

function disconnectUser(){
    
    const TOKEN = getToken();

    if(!isLogged){return "User was not connected"} else{
        if(TOKEN){
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            sessionStorage?.removeItem("token");
            
            return true
        }
    }

}

async function isLogged() {
    const user = await getAuthStatus();
    return !!user; // true si user existe, false sinon (transformation extrême)
}

export {
    loginRegisterUser,
    getUserInfo,
    disconnectUser,

    isLogged
}