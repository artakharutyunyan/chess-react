import { BLACK, WHITE, NO_PIECE_ID } from "../../chess/board";
import { SQUARE_CLICK } from "../../modules/squares/actions";
import { routePiece, movePiece, takePiece } from "../../modules/pieces/actions";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SQUARE_CLICK:
      let state = store.getState();

      let selectedSquare = state.squares.find((sq) => sq.selected);
      if (selectedSquare == null) {
        // if on selected square, then route piece (only if it's color's turn).
        if (
          (state.game.whiteTurn && action.color === WHITE) ||
          (!state.game.whiteTurn && action.color === BLACK)
        )
          next(routePiece(action.squareId, action.pieceId));
      } else {
        // if there is a selected square, then check the piece id of the clicked square.
        if (action.pieceId === NO_PIECE_ID) {
          next(movePiece(action.squareId)); // if the square has no piece, move.
        } else {
          // else if there is a piece on clicked square, and it's the same color as selected square, route.
          if (action.color === selectedSquare.color)
            next(routePiece(action.squareId, action.pieceId));
          else next(takePiece(action.squareId)); // else if it's a different color, take the piece
        }
      }
      break;
    default:
      next(action);
  }
};
