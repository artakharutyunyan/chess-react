/* Handles translations between ui state and logic state. Also stores initial state of board
 *  Logic Notation is  a mult-dimensional array, used for easy move calculating.
 *  UI-State notation is an array of objects that have the standard notation for squares and pieces in them.
 * Board.js does not store the state of the board, it merly provides a manner of mapping from logical to state, the only state is stored in redux-state. */
export const WHITE_KING_SQUARE = "e1";
export const BLACK_KING_SQUARE = "e8";

export const WHITE_K_ROOK_SQUARE = "h1";
export const BLACK_K_ROOK_SQUARE = "h8";
export const WHITE_Q_ROOK_SQUARE = "a1";
export const BLACK_Q_ROOK_SQUARE = "a8";

export const WHITE_K_AFTER_KING_CASTLE = "g1";
export const BLACK_K_AFTER_KING_CASTLE = "g8";
export const WHITE_K_AFTER_QUEEN_CASTLE = "c1";
export const BLACK_K_AFTER_QUEEN_CASTLE = "c8";

export const WHITE_R_AFTER_KING_CASTLE = "f1";
export const BLACK_R_AFTER_KING_CASTLE = "f8";
export const WHITE_R_AFTER_QUEEN_CASTLE = "d1";
export const BLACK_R_AFTER_QUEEN_CASTLE = "d8";

export const WHITE = "piece_white";
export const BLACK = "piece_black";
export const NO_PIECE_ID = "_";

export const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
};

export const numberToLetter = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h",
};

// Stores the inital state of the board in logic notation.
export const initBoard = () => {
  return [
    ["R", "N", "B", "K", "Q", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "k", "q", "b", "n", "r"],
  ];
};

// from coordinate (logic) to squareId (ui-state)
export const toSquare = (coord) => {
  return numberToLetter[coord.x] + coord.y;
};

// from squareId (ui-state) to coordinate (logic);
export const toCoord = (square) => {
  let [x, y] = square.split("");
  x = letterToNumber[x];

  // ensure that these are numbers by wrapping them in the Number js object.
  return { x: Number(x), y: Number(y) };
};

// Takes in logical board and maps it to ui-state board.
export const toState = (board) => {
  // logical board is multi-dimensional, map [y][x] to (x as letter)y
  return board
    .map((r, i) =>
      r.map((c, j) => {
        return {
          // board runs backwards, we want the 0 index to be 'h'. This is because we want the black king to be on e8, standard chess.
          id: numberToLetter["" + (9 - (j + 1))] + (i + 1),
          pieceId: c,
          color: c.toLowerCase() === c ? BLACK : WHITE,
        };
      })
    )
    .reduce((a, b) => a.concat(b));
};

// takes in UI-state and produces logical board.
export const fromState = (state) => {
  let board = [];
  state.forEach((sq) => {
    var [x, y] = sq.id.split("");
    // subtracting by one, coords are counting index.
    x = Number(letterToNumber[x]) - 1;
    y = Number(y) - 1;

    // if row does not exist, add it.
    if (!board[y]) board[y] = [];

    board[y][x] = sq.pieceId;
  });

  return board;
};

// Return a new board that uses the coords to do a 'virtual move'.
// this board is not reflected in the state, and is purley for analysis reasons.
export const virtualMove = (fromCoord, toCoord, board) => {
  let virtualBoard = board.map((r) => r.slice());
  let piece = virtualBoard[fromCoord.y - 1][fromCoord.x - 1];
  virtualBoard[fromCoord.y - 1][fromCoord.x - 1] = "_";
  virtualBoard[toCoord.y - 1][toCoord.x - 1] = piece;

  return virtualBoard;
};
