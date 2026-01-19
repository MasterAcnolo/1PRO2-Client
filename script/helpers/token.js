function getToken(){
  // Cette structure est juste valable pour le cas où ya juste un cookie.

  let TOKEN = "UNDEFINED";

  if(document.cookie){
    const COOKIE = document.cookie;
    TOKEN = COOKIE.split("token=")[1]; 

    return TOKEN
  } else if (sessionStorage.getItem("token")) {
    TOKEN = sessionStorage.getItem("token");
  } else {
    return TOKEN
  }
}

export {
    getToken
}