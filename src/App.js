import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import Characters from "./containers/Characters";
import Home from "./containers/Home";
import OneHeroComics from "./containers/OneHeroComics";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import SignUp from "./containers/SignUp/SignUp";
import "./components/css/reset.css";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faStarHalf,
  faTimesCircle,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faSearch, faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faTimes,
  faTimesCircle,
  faUser,
  faStarHalf,
  faStar,
  faStarRegular
);

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(Cookies.get("username") || null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [favorites, setFavorites] = useState(
    (Cookies.get("favorites") && JSON.parse(Cookies.get("favorites"))) || [
      [],
      [],
    ]
  );

  /* SIGNUP & LOGIN ***********/
  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    if (!token) Cookies.remove("token");
    else Cookies.set("token", token);
    if (!username) Cookies.remove("username");
    else Cookies.set("username", username);
  };

  /* RESEARCH *******************/

  const handleSearch = async (searchInput, searchReference) => {
    setIsLoading(true);
    let breadscrumb = "";
    if (searchReference === "comic") {
      breadscrumb = "comics?title";
    } else if (searchReference === "character") breadscrumb = "characters?name";

    try {
      const response = await axios.get(
        `https://marvel-by-julie.herokuapp.com/${breadscrumb}StartsWith=${searchInput}`
      );

      setData(response.data.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  /* FAVORITES *****************/

  const addFavorite = (id, reference) => {
    const tab = [...favorites];

    if (reference === "character") {
      if (tab[0].indexOf(id) === -1) {
        tab[0].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    } else {
      if (tab[1].indexOf(id) === -1) {
        tab[1].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    }

    setFavorites(tab);
    Cookies.set("favorites", JSON.stringify(tab));
  };

  const removeFavorite = (id) => {
    const favorites = Cookies.get("favorites");
    const tab = favorites && JSON.parse(favorites);

    let newFav = [[], []];
    for (let i = 0; i < tab.length; i++) {
      for (let j = 0; j < tab[i].length; j++) {
        if (i === 0) {
          if (tab[i][j] !== id) {
            newFav[0].push(tab[i][j]);
          }
        } else {
          if (tab[i][j] !== id) {
            newFav[1].push(tab[i][j]);
          }
        }
      }
    }
    setFavorites(newFav);
    Cookies.set("favorites", JSON.stringify(newFav));
  };

  return (
    <Router>
      <Header
        showModal={showModal}
        setShowModal={setShowModal}
        onLogin={onLogin}
      />
      <Switch>
        <Route path="/:id/:name/comics">
          <OneHeroComics
            setShowModal={setShowModal}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </Route>
        <Route exact path="/comics_:page">
          <Comics
            setShowModal={setShowModal}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            searchData={data}
            handleSearch={handleSearch}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Route>
        <Route path="/characters_:pageNumber">
          <Characters
            setShowModal={setShowModal}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            searchData={data}
            handleSearch={handleSearch}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Route>
        <Route path="/sign_up">
          <SignUp onLogin={onLogin} />
        </Route>
        <Route path="/myfavorites">
          <Favorites favorites={favorites} removeFavorite={removeFavorite} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
