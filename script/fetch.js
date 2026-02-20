import { getToken } from "./helpers/getToken.helpers.js";
import { API_BASE_URL } from "./variables";

export default async function fetchElement(){
    const TOKEN = getToken();
    if (!TOKEN) throw new Error('No token available');

    const headers = { "Content-Type": "application/json" };
    if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;

    const res = await fetch(`${API_BASE_URL}/users/me?populate=boards`, {
        method: "GET",
        headers,
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

    return json
}