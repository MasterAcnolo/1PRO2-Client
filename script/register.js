export default async function registerUser(data, method) {
  const API_URL = "http://localhost:1337/api";
  const endpoint = method === "register" ? "register" : "";

  const payload = method === "register" // Suivant la méthode on construit un payload custom
    ? { username: data.username, email: data.email, password: data.password }
    : { identifier: data.email, password: data.password };

  const res = await fetch(`${API_URL}/auth/local/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error?.message || "Erreur inconnue"); // Si jamais ya un error.message on envoie le message, sinon on envoie un message générique

  console.log(method === "register" ? "Inscription Réussie" : "Connexion Réussie");


  if (data.rememberMe) {
    document.cookie = `token=${json.jwt}; path=/; max-age=604800`;
    console.log("Token mis dans le cookie");

  } else {
    sessionStorage.setItem("token", json.jwt);
    console.log("Token mis dans le sessionStorage");
  }

  return json;
}