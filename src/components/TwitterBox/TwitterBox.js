import React, { useState, useEffect } from "react";
import axios from "axios";
import { TwitterTimelineEmbed } from "react-twitter-embed";

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
      <p className="title">Latest Tweets from</p>
      <p className="title mb-30">MARVEL</p>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="Marvel"
        options={{ height: 800 }}
        noHeader="true"
      />
    </div>
  );
};

export default TwitterBox;
