import React from "react";
import { WHITE, BLACK, NO_PIECE_ID } from "../chess/board";

export const pieceIdToUnicode = {
  K: "\u2654",
  k: "\u265A",
  Q: "\u2655",
  q: "\u265B",
  R: "\u2656",
  r: "\u265C",
  B: "\u2657",
  b: "\u265D ",
  N: "\u2658",
  n: "\u265E",
  P: "\u2659",
  p: "\u265F",
  _: "",
};

// render the piece, which in html is an a tag.
export const Piece = (props) => {
  const { pieceId, color, pieceClick } = props;
  let pieceClass = "piece ";
  pieceClass +=
    pieceId === NO_PIECE_ID ? "no-piece" : color === BLACK ? "black" : "white";

  let pd = (ev) => {
    ev.preventDefault();
  };

  return (
    <a
      href="javascript:void(0)"
      className={pieceClass}
      draggable="true"
      onClick={pieceClick}
      onDrop={pieceClick}
      onDragOver={pd}
      onDragEnter={pd}
      onDragStart={pieceClick}
    >
      {pieceIdToUnicode[pieceId]}
    </a>
  );
};

export const Square = (props) => {
  const {
    id,
    highlighted,
    pieceId,
    selected,
    check,
    color,
    squareClick,
  } = props;
  let squareClass = highlighted ? "highlighted" : "";
  squareClass += pieceId !== NO_PIECE_ID ? "-red" : "";
  squareClass += selected ? " selected" : "";
  squareClass += check ? " checked" : "";

  let pieceClick = squareClick.bind(null, id, pieceId, color);

  return (
    <div id={id} className={squareClass}>
      <Piece pieceId={pieceId} color={color} pieceClick={pieceClick} />
    </div>
  );
};
