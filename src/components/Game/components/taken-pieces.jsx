import React from "react";
import { connect } from "react-redux";
import { Piece } from "./square";

// simple ul of all the currently taken pieces.
export const TakenPieces = (props) => {
  let pieces = props.pieces.filter((p) => p.color === props.color);
  return (
    <ul className="takenPieces">
      {pieces.map((p, i) => (
        <li key={i}>
          <Piece key={i} {...p} pieceClick={() => {}} />
        </li>
      ))}
    </ul>
  );
};

export default connect((state = { takenPieces: [] }) => ({
  pieces: state.takenPieces,
}))(TakenPieces);
