/* Middleware, dispatches multiple actions for routing (highlighting possible move squares for selected piece), moving and taking pieces */
import {
  ROUTE_PIECE,
  MOVE_PIECE,
  TAKE_PIECE,
  addTakenPiece,
} from "../../modules/pieces/actions";
import {
  highlightSquare,
  selectSquare,
  clearHighlights,
  clearCheck,
  addPiece,
  removePiece,
} from "../../modules/squares/actions";
import { analyzeBoard, addMove } from "../../modules/game/actions";
import engine from "../../chess/engine";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case ROUTE_PIECE: // route is an action that highlights possible square for selected square.
      // This updates the state of the square, and that update is by the move and take actions to 'validate' move.
      next(clearHighlights());
      let squares = engine(store.getState().squares)(action.pieceId)(
        action.squareId
      );
      squares.forEach((s) => next(highlightSquare(s))); // highlight squares given by engine.
      next(selectSquare(action.squareId)); // select clicked on square.
      break;
    // the UI dispatches move piece or take piece based on it's own state.
    case MOVE_PIECE:
    case TAKE_PIECE:
      let state = store.getState().squares;
      let selectedSquare = state.find((s) => s.selected); // find previously selected square
      let moveSquare = state.find((s) => s.id === action.toSquareId); // find the square to move too.

      // if square that's clicked is not highlighted, or there is no selected square, do not do anything.
      if (!selectedSquare || !moveSquare.highlighted) {
        next(clearHighlights()); // other than clearing highlights.
        return;
      }

      next(clearHighlights());
      next(clearCheck());
      if (action.type === MOVE_PIECE) {
        next(addPiece(action.toSquareId, selectedSquare.pieceId)); // add piece to clicked on square.
        next(removePiece(selectedSquare.id)); // remove piece from it's original square.
        next(
          addMove(
            selectedSquare.pieceId,
            action.toSquareId,
            selectedSquare.id,
            false
          )
        ); // add move to move recorder.
      } else if (action.type === TAKE_PIECE) {
        next(removePiece(action.toSquareId)); // remove the tooken piece of the clicked on square.
        next(addPiece(action.toSquareId, selectedSquare.pieceId));
        next(removePiece(selectedSquare.id));
        next(addTakenPiece(moveSquare.pieceId, moveSquare.color));
        next(
          addMove(
            selectedSquare.pieceId,
            action.toSquareId,
            selectedSquare.id,
            true
          )
        );
      }

      // anytime a move occurs, we want to analyize the board. This is used for moves like pawn promotion, updating check status, and casteling.
      next(
        analyzeBoard(
          selectedSquare.id,
          action.toSquareId,
          selectedSquare.pieceId
        )
      );
      break;
    default:
      next(action);
  }
};
