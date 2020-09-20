/* Holds actions and constants that are related to analysis and move recording. Also updates state on who's turn it is.*/
import { toMoveNotation } from "../../chess/analysis";
import { ADD_MOVE } from "./actions";

export default (state = { moves: [], whiteTurn: true }, action) => {
  switch (action.type) {
    case ADD_MOVE:
      // to chess notation.
      let move = toMoveNotation(
        action.pieceId,
        action.toSquareId,
        action.fromSquareId,
        action.isTake
      );
      return Object.assign({}, state, {
        whiteTurn: !state.whiteTurn,
        moves: [...state.moves, move],
      });
      break;
    default:
      return state;
  }
};
