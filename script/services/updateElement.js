import { getToken } from "../helpers/getToken";

async function updateElement(type, elementId, payload){
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
    
    const res = await fetch(`${BASE_URL}${ENDPOINT}/${elementId}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${TOKEN}` 
        },
        body: JSON.stringify(payload)
    });

    const json = await res.json(); 

    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue");

    return json
}

export {
    updateElement
}
