import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

const Character = ({
  id,
  name,
  description,
  thumbnail,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const imgurl = `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;
  const isFavorite = () => {
    if (favorites[0].indexOf(id) !== -1) return true;
    else return false;
  };

  return (
    <>
      {imgurl ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_fantastic.jpg" ? null : (
        <Link to={`/${id}/${name}/comics`}>
          <li key={id} className="character-li">
            <div>
              <img alt={name} src={imgurl} />
            </div>
            {isFavorite() ? (
              <FontAwesomeIcon
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(id, "character");
                }}
                icon="star"
                size="3x"
                className="icon-star yellow"
              />
            ) : (
              <div
                onClick={(e) => {
                  e.preventDefault();

                  addFavorite(id, "character");
                }}
              >
                <FontAwesomeIcon
                  icon="star"
                  size="3x"
                  className="icon-star dark"
                />
                <FontAwesomeIcon
                  icon={["far", "star"]}
                  size="3x"
                  className="icon-star red"
                />
              </div>
            )}

            <div className="mb-20">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </li>
        </Link>
      )}
    </>
  );
};

export default Character;
