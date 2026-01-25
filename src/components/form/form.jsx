import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./form.css";

// FORM Features
import {loginRegisterUser, isLogged} from "../../../script/user.js";

function Form({ type }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remainConnected, setRemainConnected] = useState(false);
  
  const [isPending, setStatus] = useState(false);
  const [data, setData] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setStatus(true);

    let data  = {
        username,
        email,
        password,
        rememberMe: remainConnected,
        };

    try {
      const response = type === "register" 
        ? await loginRegisterUser(data, "register") 
        : await loginRegisterUser(data, "login");

      setData(response);

      // Redirection après succès
      if (isLogged()) {
        window.location.href = "/board"
      }

    } catch(error) {
      console.error(error);
    } finally {
      setStatus(false);
    }

    }
    
  return (
    <>
      <section className="formBackground">
        <div className="formContent">
          <h1>{type === "register" ? "Rejoignez Nous !" : "Bon Retour !"}</h1>
          <h2>
            {type === "register"
              ? "Créer un Compte Gratuitement"
              : "Accéder à votre espace"}
          </h2>

          <form className="form" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Nom d'Utilisateur"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Adresse Mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div id="remainConnected">
              <label htmlFor="remainConnected">
                Rester connecté
              </label>
              <input
                type="checkbox"
                id="remainConnected"
                name="remainConnected"
                checked={remainConnected}
                onChange={(e) =>
                  setRemainConnected(e.target.checked)
                }
              />
            </div>

            <button className="formBtn hover-btn" type="submit" disabled={isPending}>
              {isPending ? "Envoi en cours..." : `${type === "register" ? "S'inscrire" : "Se Connecter"}`}
            </button>
          </form>

          {type === "register" ? (
            <p>
              Déja membre ?{" "}
              <Link to="/login">
                <span>Connectez vous</span>
              </Link>
            </p>
          ) : (
            <p>
              Vous n'êtes pas membre ?{" "}
              <Link to="/register">
                <span>Inscrivez vous</span>
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Form;
