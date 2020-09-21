import React from "react";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

import Store from "../../store";
import Board from "./components/board";
import TakenPieces from "./components/taken-pieces";
import Moves from "./components/moves";
import Restart from "./components/restartButton";
import { BLACK, WHITE } from "./chess/board";
import { i18n } from "../../i18n/index";

export const Game = () => (
  <Provider store={Store}>
    <div className="container" toast={toast.dark(i18n.t("game.gameStarted"))}>
      <div className="row">
        <div className="col-md-8">
          <TakenPieces color={WHITE} />
          <Board />
          <TakenPieces color={BLACK} />
        </div>
        <div className="col-md-2">
          <Restart />
          <Moves />
        </div>
      </div>
    </div>
  </Provider>
);
