import React from "react";

const Aside = () => {
  return (
    <aside>
      <div className="author">
        <div>
          <ion-icon name="contact"></ion-icon>
        </div>
        <div className="name">
          <span>Mick</span>
          <span>23 annonces</span>
        </div>
      </div>
      <div className="buy">
        <button>
          <span>
            <ion-icon name="cart"></ion-icon>
          </span>
          Acheter
        </button>
      </div>
    </aside>
  );
};
export default Aside;
