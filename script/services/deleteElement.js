import { getToken } from "../helpers/getToken";

async function deleteElement(type,ID){
    const BASE_URL = "http://localhost:1337/api"
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
    
    const res = await fetch(`${BASE_URL}${ENDPOINT}/${ID}`, {
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