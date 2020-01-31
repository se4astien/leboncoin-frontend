import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie"; // On importe les cookies
import "./App.css";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Publish from "./containers/Publish";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";

function App() {
  const token = Cookies.get("token"); // On récupère le token avec .get
  const [user, setUser] = useState({ token: token }); // On initialise la variable user avec l'objet reçu côté backend
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  return (
    <Router>
      {isModalDisplayed === true && (
        <div className="modal">
          <div
            className="modal-close"
            onClick={() => {
              setIsModalDisplayed(false);
            }}
          >
            x
          </div>
          <div className="modal-content">
            <LogIn
              // On envoie la fonction qui va changer l'état "isModalDisplayed"
              setIsModalDisplayed={setIsModalDisplayed}
              // On envoie la fonction qui va mettre à jour l'état "user"
              setUser={setUser}
            />
          </div>
        </div>
      )}
      <Header
        user={user}
        setUser={setUser}
        setIsModalDisplayed={setIsModalDisplayed}
      />
      <Switch>
        <Route exact path="/">
          <Offers
            // On envoie à l'enfant "Offers" la variable "user"
            user={user}
          />
        </Route>
        <Route path="/offer/:id">
          <Offer
            // Idem pour "Offer"
            user={user}
          />
        </Route>
        <Route path="/user/sign_up">
          <SignUp setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish user={user} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
