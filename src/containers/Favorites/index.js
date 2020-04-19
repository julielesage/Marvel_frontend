import React, { useEffect, useState } from "react";
import axios from "axios";

import Character from "../../components/Character";
import ComicBook from "../../components/ComicBook";
import Deadpool from "../../components/img/deadpool-2-affiche.png";
import "./style.css";

const Favorites = ({ favorites, removeFavorite }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.post(
        "https://marvel-by-julie.herokuapp.com/favorites",
        {
          favorites,
        }
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [favorites]);

  return (
    <div className="wrapper favorites">
      <div className="centered deadpool column aligned">
        <img alt="deadpool love" src={Deadpool}></img>
        <div className="myfavorites">MY FAVORITES</div>
      </div>
      {isLoading ? (
        <div className="loader">
          <p> Loading...</p>
        </div>
      ) : (
        <div className="fav-list">
          {data.map((elem, index) => {
            return index === 0 ? (
              elem.length > 0 ? (
                <div key={index}>
                  <h2 style={{ color: "white" }}>CHARACTERS</h2>
                  <ul className="d-flex wrap">
                    {elem.map((item, i) => {
                      return (
                        <Character
                          key={item.results[0].id}
                          {...item.results[0]}
                          removeFavorite={removeFavorite}
                          favorites={favorites}
                        />
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <p
                  key={index}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    margin: "30px",
                  }}
                >
                  No favorite character yet !
                </p>
              )
            ) : elem.length > 0 ? (
              <div key={index}>
                <h2 style={{ color: "white", marginTop: "50px" }}>COMICS</h2>
                {elem.map((item, i) => {
                  return (
                    <ComicBook
                      key={item.results[0].id}
                      {...item.results[0]}
                      removeFavorite={removeFavorite}
                      favorites={favorites}
                    />
                  );
                })}
              </div>
            ) : (
              <p
                key={index}
                style={{ color: "white", fontSize: "20px", margin: "30px" }}
              >
                No favorite comic yet !
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
