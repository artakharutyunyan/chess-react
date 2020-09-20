import { BLACK, WHITE } from "../../chess/board";

export const SQUARE_CLICK = "chess/squares/square_click";
export const HIGHLIGHT_SQUARE = "chess/squares/hightlight_square";
export const SELECT_SQUARE = "chess/squares/select_square";
export const CHECK_SQUARE = "chess/squares/check_square";
export const CLEAR_CHECK = "chess/squares/clear_checks";
export const ADD_PIECE = "chess/squares/add_piece";
export const REMOVE_PIECE = "chess/squares/remove_piece";
export const CLEAR_HIGHLIGHTS = "chess/squares/clear_highlighs";
export const INIT_SQUARES = "chess/squares/init";

export const squareClick = (squareId, pieceId, color) => ({
  type: SQUARE_CLICK,
  squareId,
  pieceId,
  color,
});

// set highlighted property to true for square id.
export const highlightSquare = (squareId) => ({
  type: HIGHLIGHT_SQUARE,
  squareId,
});

// set selected property  to true for squareId.
export const selectSquare = (squareId) => ({
  type: SELECT_SQUARE,
  squareId,
});

// set check property to true for squareId.
export const checkSquare = (squareId) => ({
  type: CHECK_SQUARE,
  squareId,
});

export const clearCheck = () => ({ type: CLEAR_CHECK });

// sets pieceId property of square.
export const addPiece = (squareId, pieceId) => ({
  type: ADD_PIECE,
  squareId,
  pieceId,
  color: pieceId.toLowerCase() === pieceId ? BLACK : WHITE,
});

// sets pieceId to NO_PIECE_ID for squareId.
export const removePiece = (squareId) => ({
  type: REMOVE_PIECE,
  squareId,
});

// sets highlighted and selected to false for all squares.
export const clearHighlights = () => ({ type: CLEAR_HIGHLIGHTS });

// sets the initial board.  Called when board component is loaded.
export const initSquares = () => ({ type: INIT_SQUARES });
