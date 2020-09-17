import React from "react";

import "./game.styles.css";
import Square from "./Square.js";

export default class Board extends React.Component {
  renderSquare(i, squareColor) {
    return (
      <Square
        key={i}
        keyVal={i}
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        color={squareColor}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareColor =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? "light-square"
            : "dark-square";
        squareRows.push(this.renderSquare(i * 8 + j, squareColor));
      }
      board.push(
        <div className="board-row" key={i}>
          {squareRows}
        </div>
      );
    }
    return <div>{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}
