import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isErrorMessageDisplayed, setIsErrorMessageDisplayed] = useState(false);
  const [cgv, setCGV] = useState(false);

  // Pour rediriger vers la page d'accueil
  const history = useHistory();
  let isEnabled = false;

  // On vérifie que tous les champs sont valides
  if (
    username !== "" &&
    email !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    cgv === true &&
    password === passwordConfirm
  ) {
    isEnabled = true;
  }
  return (
    <div className="wrapper">
      <div className="sign-up">
        <div>
          <h1>Pourquoi créer un compte ?</h1>
          <div className="flex">
            <div className="icon">
              <i class="material-icons">access_time</i>
            </div>
            <div>
              <h3>Gagnez du temps</h3>
              <p>
                Publiez vos annonces rapidement, avec vos informations
                pré-remplies chaque fois que vous souhaitez déposer une nouvelle
                annonce.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="icon">
              <i class="material-icons">notifications_none</i>
            </div>
            <div>
              <h3>Soyez les premiers informés</h3>
              <p>
                Créer des alertes Immo ou Emploi et ne manquez jamais l'annonce
                qui vous intéresse.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="icon">
              <i class="material-icons">remove_red_eye</i>
            </div>
            <div className="icon">
              <h3>Visibilité</h3>
              <p>
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus).
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>Créez un compte</h2>
          <form
            onSubmit={async event => {
              // bloque le rafraichissement de la page
              event.preventDefault();
              // Si tout est OK
              if (isEnabled === true) {
                // 1. On appelle le serveur pour créer un compte
                const response = await axios.post(
                  "https://leboncoin-api.herokuapp.com/api/user/sign_up",
                  {
                    username: username,
                    email: email,
                    password: password
                  }
                );
                // 2. Enregistre le token dans les cookies
                Cookies.set("token", response.data.token);

                // 3. On change l'état user qui se trouve dans App.js
                props.setUser(response.data);

                // 4. On redirige vers la page d'accueil
                history.push("/");
              } else {
                alert("Le formulaire n'est pas valide");
              }
            }}
          >
            <label>Pseudo *</label>
            <input
              type="text"
              placeholder="Votre pseudo"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <label>Adresse email *</label>
            <input
              type="text"
              placeholder="Votre adresse email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <div className="password">
              <div>
                <label>Mot de passe *</label>
                <input
                  type="password"
                  placeholder="Entrez un mot de passe"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <label>Confirmez le mot de passe *</label>
                <input
                  onBlur={() => {
                    // La desélection
                    // Pour activer l'affichage des erreurs :
                    setIsErrorMessageDisplayed(true);
                  }}
                  onFocus={() => {
                    // La sélection
                    // Pour désactiver l'affichage des erreurs :
                    setIsErrorMessageDisplayed(false);
                  }}
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={passwordConfirm}
                  onChange={event => {
                    setPasswordConfirm(event.target.value);
                  }}
                />
                {isErrorMessageDisplayed === true &&
                  password !== passwordConfirm && (
                    <span>
                      Les mots de passe sont différents. Veuillez réessayer.
                    </span>
                  )}
              </div>
            </div>
            <div className="condition">
              <input
                type="checkbox"
                checked={cgv}
                onChange={event => {
                  setCGV(event.target.checked);
                }}
              />
              <p>
                J'accepte les conditions générales de vente et les conditions
                générales d'utilisation.
              </p>
            </div>
            <div>
              <input
                type="submit"
                value="Valider"
                className={isEnabled ? "enabled" : "disabled"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
