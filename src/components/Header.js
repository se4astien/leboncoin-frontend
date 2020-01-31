import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../images/leboncoin-logo.svg";
import Cookies from "js-cookie";

export default function Header(props) {
  return (
    <header>
      <ul className="wrapper menu">
        <li>
          <ul>
            <li>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <button>
                <span>
                  <ion-icon name="add-circle-outline"></ion-icon>
                </span>
                Déposer une annonce
              </button>
            </li>
            <li>
              <span className="search">
                <ion-icon name="search"></ion-icon>
              </span>
              Rechercher
            </li>
          </ul>
        </li>
        <li className="connexion">
          <span>
            <ion-icon name="person"></ion-icon>
          </span>
          {props.user.token ? (
            <span
              onClick={() => {
                // On met à jour l'état user
                props.setUser({});
                // On supprimer le cookie
                Cookies.remove("token");
              }}
            >
              Se déconnecter
            </span>
          ) : (
            <span
              onClick={() => {
                props.setIsModalDisplayed(true);
              }}
            >
              Se connecter
            </span>
          )}
        </li>
      </ul>
    </header>
  );
}
