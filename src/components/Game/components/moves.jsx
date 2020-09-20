import React from "react";
import { connect } from "react-redux";
import { groupMovesByColor } from "../modules/game/selectors";
import "../game.css";

// display a table of moves, in move notation.
export const Moves = (props) => {
  const { moves, whiteTurn } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className={whiteTurn ? "active" : ""}>White</th>
          <th className={!whiteTurn ? "active" : ""}>Black</th>
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

export default connect(selector)(Moves);
