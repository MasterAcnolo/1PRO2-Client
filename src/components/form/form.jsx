import { Link } from "react-router-dom";
import { useState } from "react";

import "./form.css";

function Form({ type }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remainConnected, setRemainConnected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data;

        if (type === "register") {
            data = {
            name,
            username,
            email,
            password,
            };
        }

        if (type === "login") {
            data = {
            username,
            email,
            password,
            rememberMe: remainConnected,
            };
        }

        console.log(type, data);
    };

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
            {type === "register" ? (
              <input
                type="text"
                placeholder="Nom"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            ) : null}

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

            {type === "login" ? (
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
            ) : null}

            <button className="formBtn hover-btn" type="submit">
              {type === "register" ? "S'inscrire" : "Se Connecter"}
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
