export default function registerUser(data) {
    
  const API_URL = "http://localhost:1337/api";

  return fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  })
    .then( async (res) => {
      if (!res.ok) {

        const json = await res.json();
            if (!res.ok) {
                throw new Error(json.error.message || "Erreur inconnue");
            }
        return json.error.message;
      }
      return res.json();
    })
    .then((json) => {
      console.log("Réponse API:", json);
      return json; // renvoie la réponse au form
    })
    .catch((err) => {
      console.log("Erreur fetch register:", err.message); // Faudra faire des notifications Toast pour les erreurs
      throw err; // renvoie l'erreur au form
    });
}