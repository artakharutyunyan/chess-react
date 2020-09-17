import React from "react";

import "./game.styles.css";
import Square from "./Square.js";

export default class FallenPieces extends React.Component {
  renderSquare(square, i, squareColor) {
    return <Square key={i} keyVal={i} piece={square} style={square.style} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.props.whiteFallenPieces.map((ws, index) =>
            this.renderSquare(ws, index)
          )}
        </div>
        <div className="board-row">
          {this.props.blackFallenPieces.map((bs, index) =>
            this.renderSquare(bs, index)
          )}
        </div>
      </div>
    );
  }
}
