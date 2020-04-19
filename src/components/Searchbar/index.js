import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

const Searchbar = ({ searchReference, handleSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchInput, searchReference);
        }}
        className="aligned centered searchbar margin-special"
      >
        <div className="input-search space-between">
          <FontAwesomeIcon
            className="search-bar-i-search"
            icon="search"
            size="1x"
          />

          <input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="What are you searching for?"
            type="text"
          />

          <button type="submit" className="searchbar-btn">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default Searchbar;
