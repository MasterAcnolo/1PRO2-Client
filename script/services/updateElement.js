import { getToken } from "../helpers/getToken";
import { API_BASE_URL } from "../variables";

async function updateElement(type, elementId, payload){
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
    
    const res = await fetch(`${API_BASE_URL}${ENDPOINT}/${elementId}`, {
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
