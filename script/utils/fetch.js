import { getToken } from "../helpers/token";

export default async function fetchElement(){
    const BASE_URL = "http://localhost:1337/api"
    const TOKEN = getToken();
    
    const res = await fetch(`${BASE_URL}/users/me?populate=boards`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${TOKEN}` 
        },
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

    return json
}