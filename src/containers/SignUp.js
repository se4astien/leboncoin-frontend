import React from "react";

const SignUp = () => {
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
          <form>
            <label>Pseudo *</label>
            <input type="text" />
            <label>Adresse email *</label>
            <input type="text" />
            <div className="password">
              <div>
                <label>Mot de passe *</label>
                <input type="password" />
              </div>
              <div>
                <label>Confirmez le mot de passe *</label>
                <input type="password" />
              </div>
            </div>
            <div className="condition">
              <input type="checkbox" />
              <span class="checkmark"></span>
              <p>
                J'accepte les conditions générales de vente et les conditions
                générales d'utilisation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
