/* Main reducer of chess app.  Handles adding/removing/highlighting/selecting of pieces or squares.  */
import {
  initBoard,
  toState,
  NO_PIECE_ID,
  WHITE,
  BLACK,
} from "../../chess/board";
import {
  HIGHLIGHT_SQUARE,
  SELECT_SQUARE,
  CHECK_SQUARE,
  ADD_PIECE,
  REMOVE_PIECE,
  CLEAR_HIGHLIGHTS,
  CLEAR_CHECK,
  INIT_SQUARES,
} from "./actions";

export const square = (state, action) => {
  switch (action.type) {
    case HIGHLIGHT_SQUARE:
      return Object.assign({}, state, { highlighted: true });
    case SELECT_SQUARE:
      return Object.assign({}, state, { selected: true });
    case CHECK_SQUARE:
      return Object.assign({}, state, { check: true });
    case ADD_PIECE:
      return Object.assign({}, state, {
        pieceId: action.pieceId,
        color: action.color,
      });
    case REMOVE_PIECE:
      return Object.assign({}, state, { pieceId: NO_PIECE_ID });
    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case INIT_SQUARES:
      return toState(initBoard()); // use the board to get the initial board, and map it to ui-state.
    case HIGHLIGHT_SQUARE:
    case SELECT_SQUARE:
    case CHECK_SQUARE:
    case ADD_PIECE:
    case REMOVE_PIECE:
      return state.map((s) =>
        s.id === action.squareId ? square(s, action) : Object.assign({}, s)
      );
    case CLEAR_HIGHLIGHTS:
      return state.map((s) =>
        Object.assign({}, s, { highlighted: false, selected: false })
      );
    case CLEAR_CHECK:
      return state.map((s) => Object.assign({}, s, { check: false }));
    default:
      return state;
  }
};
