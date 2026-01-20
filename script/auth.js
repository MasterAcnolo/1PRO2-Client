import { getToken } from "./helpers/token";

async function getAuthStatus() {
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


async function isLogged() {
    const user = await getAuthStatus();
    return !!user; // true si user existe, false sinon (transformation extrême)
}

function disconnect(){
    
    const TOKEN = getToken();

    if(!isLogged){return "User was not connected"} else{
        if(TOKEN){
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            sessionStorage?.removeItem("token");
            
            return true
        }
    }

}

export {
    getAuthStatus,
    isLogged,
    disconnect
}