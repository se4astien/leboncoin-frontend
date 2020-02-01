import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");

  // Pour accéder à l'historique de navigation
  const history = useHistory();

  let isEnabled = false;

  // Si tous les champs sont remplis
  if (title && description && price && file) {
    isEnabled = true;
  }
  // SI pas connecté
  console.log(props.user); // renvoie l'objet token
  console.log(props.user.token); // undefined

  // SI connecté
  console.log(props.user); // renvoie l'objet token
  console.log(props.user.token); // K1ZfsWncQnQLbLsYo7iLlqnZ65F1aTU2OprXsh9tQQSdn4ZDCb7qPCPKjwnnaVbo

  return (
    <div className="wrapper">
      <div className="publish box">
        {props.user.token === undefined ? (
          <p>Merci de vous connectez pour déposer une annonce</p>
        ) : (
          <>
            <h1>Déposer une annonce</h1>
            <form
              className="form-publish"
              onSubmit={async event => {
                event.preventDefault(); // bloque le chargement de la page à la soumission du formulaire

                const data = new FormData();
                // append permet d'ajouter dans notre API les fichiers qu'on souhaite
                data.append("files", file); // "clé de l'API", valeur du state
                data.append("title", title);
                data.append("price", price);
                data.append("description", description);

                if (isEnabled === true) {
                  // tout ce qui concerne les requetes se trouve dans un try/catch !!!
                  try {
                    const response = await axios.post(
                      "https://leboncoin-api.herokuapp.com/api/offer/publish", // url de la requete
                      data, // body de l'API
                      {
                        // headers est un objet => est-ce que la personne qui fait la requete est bien autorisé à la faire ?
                        headers: {
                          Authorization: "Bearer " + props.user.token,
                          "Content-Type": "multipart / form - data" // cette ligne est optionnelle
                        }
                      }
                    );
                    // On va directement sur la page d'offre concernée
                    history.push("/offer/" + response.data._id);
                  } catch (err) {
                    console.log("An error occured");
                  }
                } else {
                  alert("Le formulaire n'est pas valide");
                }
              }}
            >
              <label>Titre de l'annonce *</label>
              <input
                type="text"
                onChange={event => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
              <label>Texte de l'annonce *</label>
              <textarea
                onChange={event => {
                  setDescription(event.target.value);
                }}
                value={description}
              ></textarea>
              <label>Prix de l'annonce *</label>
              <input
                type="number"
                onChange={event => {
                  setPrice(event.target.value);
                }}
                value={price}
              />
              <label>Photo *</label>
              <input
                type="file"
                onChange={event => {
                  setFile(event.target.files[0]);
                }}
              />
              <input
                className={isEnabled ? "enabled" : "disabled"}
                type="submit"
                value="Valider"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Publish;
