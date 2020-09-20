import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import chess from "./components/Game/modules/middleware/chess-middleware";
import analysis from "./components/Game/modules/middleware/analysis-middleware";
import click from "./components/Game/modules/middleware/click-middleware";

import squares from "./components/Game/modules/squares/reducer";
import pieces from "./components/Game/modules/pieces/reducer";
import game from "./components/Game/modules/game/reducer";

const rootReducer = combineReducers({
  squares: squares, // main ui slice of the state.
  takenPieces: pieces, // taken pieces list.
  game: game, // move recording.
});

let composedMiddleware = compose(
  applyMiddleware(click), // handles click events on the squares.
  applyMiddleware(chess), // handles the move, take and route actions.
  applyMiddleware(analysis) // handles specialty cases like castling, checking and pawn promotion.
);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composedMiddleware = compose(
    composedMiddleware,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default createStore(rootReducer, composedMiddleware);
