import { getToken } from "./helpers/token";

async function getAuthStatus() {
    const TOKEN = await getToken();

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

export {
    getAuthStatus,
    isLogged
}