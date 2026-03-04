import { getToken } from "../helpers/getToken.helpers";
import { API_BASE_URL } from "../variables";

async function getElement(type, ID) {
    const TOKEN = getToken();

    let ENDPOINT = "";

    switch (type) {
        case "BOARD":
            ENDPOINT = `/boards/${ID}?populate[columns][populate][0]=cards`; // On populate les colonnes (donc premier niveau,) et pour chaque colonne on va aussi récupérer le second niveau
            break;
        case "COLUMN":
            ENDPOINT = `/columns/${ID}?populate=cards`;
            break;
        case "CARD":
            ENDPOINT = `/cards/${ID}`;
            break;
        case "BOARDLIST":
            ENDPOINT = `/users/me?populate=boards`;
            break;
        default:
            return null;
    }

    const res = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
        }
    });

    let json = null;

    if (res.headers.get("content-type")?.includes("application/json")) {
        json = await res.json();
    }

    if (!res.ok) {
        throw new Error(json?.error?.message || "Erreur inconnue");
    }

    return json;
}

export {
    getElement
};
