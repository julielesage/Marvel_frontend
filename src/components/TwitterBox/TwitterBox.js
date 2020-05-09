import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TwitterBox.css";

const TwitterBox = ({ name }) => {
  const [tweets, setTweets] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get();
  //     setTweets(response.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="tweeter-box centered column aligned">
      <img src="https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg" />
      <p className="title">Latest Tweets about</p>
      <p className="title mb-30">{name}</p>
      {tweets ? (
        {
          /* tweets.map */
        }
      ) : (
        <div className="centered aligned grey">
          Waiting for Twitter authentification approval, will be updated as soon
          as granted ...
        </div>
      )}
    </div>
  );
};

export default TwitterBox;
