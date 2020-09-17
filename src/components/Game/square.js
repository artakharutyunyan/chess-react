import React from "react";

import "./game.styles.css";

export default function Square(props) {
  return (
    <button
      className={"square " + props.color}
      onClick={props.onClick}
      style={props.style}
      key={props.keyVal}
    ></button>
  );
}
