import React from "react";
import Character from "../Character";
import { Link } from "react-router-dom";

const PeopleList = ({ people, isLoading, research }) => {
  return (
    <ul className="d-flex wrap">
      {research === ""
        ? people.results.map((character, i) => {
            return (
              <div to="!#">
                <Character {...character} />
              </div>
            );
          })
        : null}
    </ul>
  );
};

export default PeopleList;
