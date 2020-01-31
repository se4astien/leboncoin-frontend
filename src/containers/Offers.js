import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Product from "../components/Product";

export default function Offer() {
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count"
    );
    // console.log(response.data.offers);
    setOffers(response.data.offers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <section className="wrapper">
        <div className="offers">
          {isLoading ? (
            <p>En cours de chargement...</p>
          ) : (
            <ul>
              {offers.map((item, index) => {
                const dateCreated = new Date(item.created);
                const date =
                  dateCreated.toLocaleDateString() +
                  " à " +
                  dateCreated.toLocaleTimeString();
                return <Product {...item} date={date} />;
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
