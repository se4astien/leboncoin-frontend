import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="wrapper">
        <div className="hero-big">
          <div className="searchB flex">
            <span className="search-i">
              <ion-icon name="search"></ion-icon>
            </span>
            <input type="text" placeholder="Que recherchez-vous ?" />
            <button type="button">Rechercher</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
