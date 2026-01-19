export function getToken(){
  // Cette structure est juste valable pour le cas où ya juste un cookie.
  const COOKIE = document.cookie;
  const TOKEN = COOKIE.split("token=")[1]; 
  return TOKEN;
}

export async function registerUser(data, method) {
  const API_URL = "http://localhost:1337/api";
  const ENDPOINT = method === "register" ? "register" : "";

  let payload;

  if (method === "register") {
    payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
  } else {
    payload = {
      identifier: data.email, // peut être email ou username
      password: data.password,
    };
  }


  const res = await fetch(`${API_URL}/auth/local/${ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || "Erreur inconnue"); // Si erreur on envoie message
  }

  if (res.ok){ // Inscription Réussies
    console.log(method === "register" ? "Inscription Réussie" : "Connexion Réussie");
    
    if(data.rememberMe){  
      document.cookie = `token=${json.jwt}; path=/; max-age=604800`; // 1 Semaine
      console.log("Token mis dans le Cookies");
    } else{
      sessionStorage.setItem("token", json.jwt);
      console.log("Token mis dans le Session Storage");
    }
  }

  return json;
}
