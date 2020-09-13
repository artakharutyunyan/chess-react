import React from "react";

import "./game.styles.css";
import Square from "./square.js";

export default class FallenPiecesBlock extends React.Component {
  renderSquare(square, i, squareShade) {
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
