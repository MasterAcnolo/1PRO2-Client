import { getToken } from "../helpers/getToken";

async function createElement(type,payload){
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
    }
    
    const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${TOKEN}` 
        },
        body: JSON.stringify(payload)
    });

    const json = await res.json(); 

    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique



    return json
}

export {
    createElement
}