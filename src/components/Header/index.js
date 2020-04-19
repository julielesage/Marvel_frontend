import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

import LogIn from "../LogIn/LogIn";
import Logo from "../img/Logo";
import "./style.css";

const Header = ({ showModal, setShowModal, onLogin }) => {
  const username = Cookies.get("username");
  return (
    <>
      <header>
        <div className="wrapper">
          <div className="aligned space-between">
            <ul className="centered aligned">
              <Link to="/characters_1" className="centered aligned">
                <Logo />
              </Link>

              <Link to="/characters_1">
                <p>CHARACTERS</p>
              </Link>

              <Link to="/comics_1/">
                <p>COMICS</p>
              </Link>
            </ul>
            <div className="aligned mr-30">
              <Link to="/myfavorites" className="aligned left relative mr-30">
                <FontAwesomeIcon className="star" icon={["far", "star-half"]} />
                <p>FAVORITES</p>
              </Link>
              {username ? (
                <div
                  className="centered column mgtop cursor"
                  onClick={(e) => {
                    e.preventDefault();
                    onLogin(null, null);
                  }}
                >
                  <span className="fs-15 bold">{username}</span>
                  <span className="fs-12">Deconnect</span>
                </div>
              ) : (
                <div
                  className="centered column mgtop cursor"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  <FontAwesomeIcon className="user" icon={["far", "user"]} />
                  <span className="fs-12">Connect</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {showModal === true && (
        <LogIn setShowModal={setShowModal} onLogin={onLogin} />
      )}
    </>
  );
};

export default Header;
