import { getToken } from "./helpers/token";

async function getAuthStatus() {
    const TOKEN = getToken();

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

        return userInfo

    } catch (err) {
        console.error(err.message);
        return false
    }
}

async function isLogged() {
    const res = await getAuthStatus(); 
    if (res === false) {
        console.log(false);
        return false;
    } else {
        console.log(true);
        return true;
    }
}


isLogged()

export {
    getAuthStatus,
    isLogged
}