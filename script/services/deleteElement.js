import { getToken } from "../helpers/getToken";
import { API_BASE_URL } from "../variables";

async function deleteElement(type,ID){
    const TOKEN = getToken();

    let ENDPOINT = "";

    switch(type){
        case "BOARD":
            ENDPOINT = "/boards"
            break;
        case "COLUMN":
            ENDPOINT = "/columns"
            break;
        case "CARD":
            ENDPOINT = "/cards"
            break;
        default:
            console.log("Invalid Type")
            return null
    }
    
    const res = await fetch(`${API_BASE_URL}${ENDPOINT}/${ID}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${TOKEN}` 
        },
    });

    let json = null;

    if (res.headers.get("content-type")?.includes("application/json")) {
        json = await res.json();
    }

    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique



    return json
}

export {
    deleteElement
}