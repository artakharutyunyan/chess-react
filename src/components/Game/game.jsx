import React from "react";
import { Provider } from "react-redux";

import Store from "../../store";
import Board from "./components/board";
import TakenPieces from "./components/taken-pieces";
import Moves from "./components/moves";

import { BLACK, WHITE } from "./chess/board";

export const Game = () => (
  <Provider store={Store}>
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <TakenPieces color={WHITE} />
          <Board />
          <TakenPieces color={BLACK} />
        </div>
        <div className="col-md-2">
          <Moves />
        </div>
      </div>
    </div>
  </Provider>
);
