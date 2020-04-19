import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicBook = ({
  id,
  title,
  description,
  thumbnail,
  pageCount,
  prices,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const imgurl = `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;
  const isFavorite = () => {
    if (favorites[1].indexOf(id) !== -1) return true;
    else return false;
  };

  return imgurl ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_fantastic.jpg" ? null : (
    <li className="comic-li">
      <div className="comic-book">
        <img alt={title} src={imgurl} />
      </div>
      {isFavorite() ? (
        <FontAwesomeIcon
          onClick={(e) => {
            e.preventDefault();
            removeFavorite(id);
          }}
          icon="star"
          size="3x"
          className="icon-star-comic yellow"
        />
      ) : (
        <div
          onClick={(e) => {
            e.preventDefault();

            addFavorite(id, "comic");
          }}
        >
          <FontAwesomeIcon
            icon="star"
            size="3x"
            className="icon-star-comic dark"
          />
          <FontAwesomeIcon
            icon={["far", "star"]}
            size="3x"
            className="icon-star-comic red"
          />
        </div>
      )}
      <div classNam="space-between">
        <div>
          <h2>{title}</h2>
          <p className="description">{description}</p>
        </div>
        <div>
          <p>Pages : {pageCount}</p>
          {prices[0].price && prices[0].price !== undefined && (
            <p>Print price : {prices[0].price} $</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default ComicBook;
