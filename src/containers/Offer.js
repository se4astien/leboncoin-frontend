import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Aside from "../components/Aside";

export default function Offer(props) {
  const { id } = useParams(); // récupère l'id transmis via offers
  const [isLoading, setIsLoading] = useState(false);
  const [offer, setOffer] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/${id}`
    );
    setOffer(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(offer);
  // console.log(offer.creator);

  // Update Date
  const dateCreated = new Date(offer.created);
  const date =
    dateCreated.toLocaleDateString() + " à " + dateCreated.toLocaleTimeString();

  return (
    <section className="offer">
      <div className="wrapper">
        {isLoading ? (
          <p>En cours de chargement...</p>
        ) : (
          <>
            <article>
              <div className="item">
                <div className="bg-grey center">
                  <img src={offer.pictures} alt={offer.title} />
                </div>

                <div className="infos flex">
                  <h1>{offer.title}</h1>
                  <span className="price">{offer.price} €</span>
                  <span className="date">{date}</span>
                </div>
              </div>
              <div className="description">
                <h3>Description</h3>
                <p>{offer.description}</p>
              </div>
            </article>

            <Aside />
          </>
        )}
      </div>
    </section>
  );
}
