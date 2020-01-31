import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

const LogIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Pour accéder à l'historique de navigation
  const history = useHistory();
  let isEnabled = false;

  if (email !== "" && password !== "") {
    isEnabled = true;
  }
  return (
    <div>
      <p className="title">Connexion</p>
      <form
        onSubmit={async event => {
          event.preventDefault();

          try {
            const response = await axios.post(
              "https://leboncoin-api.herokuapp.com/api/user/log_in",
              {
                email: email,
                password: password
              }
            );

            if (response.data.token && isEnabled === true) {
              // 1. On sauvegarde le token dans les cookies
              Cookies.set("token", response.data.token); // "token" est le nom qu'on donne au cookie, response.data.token est l'endroit où il se situe dans l'API
              // 2. On ferme le modal
              props.setIsModalDisplayed(false);
              // 3. On met à jour l'état user
              props.setUser(response.data);
              // 4. Naviguer vers la page d'accueil
              history.push("/");
              // Naviguer vers la page precedente
              // history.goBack();
            } else {
              alert("Le formulaire n'est pas valide");
            }
          } catch (e) {
            alert(e.message);
          }
        }}
      >
        <label>Adresse e-mail</label>
        <input
          type="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <input className="connect" type="submit" value="Se connecter" />
      </form>
      <div className="no-account">
        <p>Vous n'avez pas de compte ?</p>
        <Link to="/user/sign_up">
          <button
            onClick={() => {
              props.setIsModalDisplayed(false);
            }}
          >
            Créer un compte
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
