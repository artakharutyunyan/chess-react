import React from "react";
import { connect } from "react-redux";
import { initSquares, squareClick } from "../modules/squares/actions";
import { Square } from "./square";

export class Board extends React.Component {
  componentDidMount() {
    this.props.initSquares(); // when the component is loaded, load the initial board state.
  }

  render() {
    // render state into a list of squares.
    return (
      <div className="board">
        {this.props.squares
          .slice()
          .reverse()
          .map((s, i) => (
            <Square
              key={i}
              {...s}
              squareClick={this.props.squareClick}
              whiteTurn={this.props.whiteTurn}
            />
          ))}
      </div>
    );
  }
}

// squares use whiteTurn property from state to not allow somebody to move twice.
export default connect(
  (state = { squares: [], game: { whiteTurn: true } }) => ({
    squares: state.squares,
    whiteTurn: state.game.whiteTurn,
  }),
  { squareClick, initSquares }
)(Board);
