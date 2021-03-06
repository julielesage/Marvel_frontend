import React, { useEffect, useState } from "react";
import axios from "axios";
import ComicBook from "../../components/ComicBook";
import { useParams } from "react-router-dom";

// components
import TwitterBox from "../../components/TwitterBox/TwitterBox";
import Gauge from "../../components/Gauge/Gauge";
import "./style.css";

const OneHeroComics = ({
  favorites,
  addFavorite,
  removeFavorite,
  setShowModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  let { id, name } = useParams();
  name = name.replace("%", " ");
  const message = `OU TROUVER ${name.toUpperCase()} ?`;

  useEffect(() => {
    const fetchData = async () => {
      //GET COMICS
      const response = await axios.get(
        `https://marvel-by-julie.herokuapp.com/comics/${id}`
      );

      setData(response.data.data.results);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="d-flex hero">
        <section className="hero-comics">
          <h1>{message} </h1>
          {isLoading === true ? (
            <div className="loader">
              <p> Loading...</p>
            </div>
          ) : (
            <ul className="d-flex wrap column">
              {data.map((book, i) => {
                return (
                  <ComicBook
                    {...book}
                    key={book.id}
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                  />
                );
              })}
            </ul>
          )}
        </section>
        <aside>
          <Gauge likedBy={70} name={name.toUpperCase()} />
          <TwitterBox name={name.toUpperCase()} />
        </aside>
      </div>
    </div>
  );
};

export default OneHeroComics;
