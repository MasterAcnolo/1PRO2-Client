function getToken() {

  if (document.cookie) {

    const cookie = document.cookie;
    return cookie.split("=")[1] || null;
  } 
  
  const sessionToken = sessionStorage.getItem("token");
  if (sessionToken) return sessionToken;

  // Aucun token trouvé
  return null;
}

export {
    getToken
}