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

  if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // TOAST "Erreur pendant l'inscription / connexion. A faire varier selon la variable "method"

  console.log(method === "register" ? "Inscription Réussie" : "Connexion Réussie"); // TOAST

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
    const user = await getUserInfo();
    return !!user; // true si user existe, false sinon (transformation extrême)
}

export {
    loginRegisterUser,
    getUserInfo,
    disconnectUser,

    isLogged
}