import React from "react";

import "./championsList.styles.css";
import champions from "./championsList.config";

function ChampionsList() {
  return (
    <div className="container">
      <div className="flex">
        <h1>Chess Immortals: The World Champions of Chess</h1>
        <p>
          The classical line of World Chess Champions began with Wilhelm
          Steinitz's defeat of Johannes Zukertort in their 1886 match. Since
          that time, the World Championship has typically been contested in a
          match between the current champion and a challenger, though
          tournaments have been used on occasion for various reasons.
        </p>
        <div className="wrapper">
          {champions.map((champion) => (
            <div className="date-and-img">
              <div key={champion.id} className="header">
                <div>{champion.name}</div>
                <div>{champion.date}</div>
              </div>
              <img src={champion.img} alt="" className="img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChampionsList;
