import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Product = props => {
  return (
    <li>
      <Link to={"offer/" + props._id}>
        <div className="product flex">
          <img src={props.pictures[0]} alt={props.title} />
          <div className="infos">
            <h2>{props.title}</h2>
            <div className="price-date">
              <span>{props.price}€</span>
              <span>{props.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Product;
