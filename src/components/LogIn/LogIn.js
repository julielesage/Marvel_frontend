import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../img/Logo";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogIn = ({ onLogin, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.post(
        "https://marvel-by-julie.herokuapp.com/user/log_in",
        {
          email,
          password,
        }
      );

      if (!response.data.token) setErrorMessage(response.data.message);
      onLogin(response.data.token, response.data.account.username);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="modal">
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flee right">
          <FontAwesomeIcon
            icon={["fas", "times"]}
            size="2x"
            className="grey cursor times"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          />
        </div>
        <div className="centered aligned column space-between red-bordered p-20">
          <div className="logo-box">
            <Logo />
          </div>
          {errorMessage ? (
            <h4>{errorMessage}</h4>
          ) : (
            <h4>Merci de vous identifier pour poursuivre</h4>
          )}
        </div>
        <div className="p-20">
          <p>Email</p>
          <input
            type="text"
            name="email"
            placeholder="écrivez ici votre nom"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
          <p>Mot de passe</p>
          <input
            type="text"
            name="password"
            placeholder="renseignez ici votre mot de passe"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn-login cursor">
            Se connecter
          </button>
          <p>Je n'ai pas encore de compte ?</p>
          <div
            className="link-signup cursor"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          >
            <Link to="/sign_up">S'inscrire</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
