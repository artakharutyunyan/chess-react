import React from "react";
import { connect } from "react-redux";
import { groupMovesByColor } from "../modules/game/selectors";
import { i18n } from "../../../i18n/index";
import { withTranslation } from "react-i18next";
import "../game.css";

// display a table of moves, in move notation.
export const Moves = (props) => {
  const { moves, whiteTurn } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className={whiteTurn ? "active" : ""}>{i18n.t("game.white")}</th>
          <th className={!whiteTurn ? "active" : ""}>{i18n.t("game.black")}</th>
        </tr>
      </thead>
      <tbody>
        {moves.map((m, i) => (
          <tr key={i}>
            <td>{m.white}</td>
            <td>{m.black}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const initialState = {
  game: {
    moves: [],
    whiteTurn: true,
  },
};

const selector = (state = initialState) => {
  return {
    whiteTurn: state.game.whiteTurn,
    moves: groupMovesByColor(state.game.moves),
  };
};

export default withTranslation()(connect(selector)(Moves));
