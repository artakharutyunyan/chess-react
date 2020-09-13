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
        <ul>
          {champions.map((champion) => (
            <li key={champion.id}>{champion.info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChampionsList;
