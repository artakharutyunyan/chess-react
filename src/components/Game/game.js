import React from "react";

import "./game.styles.css";
import Board from "./board.js";
import King from "../../pieces/king.js";
import FallenPiecesBlock from "./fallenPiecesBlock";
import initialiseChessBoard from "../../helpers/cheesBoard.js";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenPieces: [],
      blackFallenPieces: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "white",
    };
  }

  handleClick(i) {
    const squares = [...this.state.squares];

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: "RGB(111,143,114)",
        };
        this.setState({
          status: "Move selected piece",
          sourceSelection: i,
        });
      }
      return;
    }

    squares[this.state.sourceSelection].style = {
      ...squares[this.state.sourceSelection].style,
      backgroundColor: "",
    };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
    } else {
      const whiteFallenPieces = [];
      const blackFallenPieces = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(
        this.state.sourceSelection,
        i,
        isDestEnemyOccupied
      );

      if (isMovePossible) {
        if (squares[i] !== null) {
          if (squares[i].player === 1) {
            whiteFallenPieces.push(squares[i]);
          } else {
            blackFallenPieces.push(squares[i]);
          }
        }

        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = null;

        const isCheckMe = this.isCheckForPlayer(squares, this.state.player);

        if (isCheckMe) {
          this.setState((oldState) => ({
            status: "You have a check!",
            sourceSelection: -1,
          }));
        } else {
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === "white" ? "black" : "white";

          this.setState((oldState) => ({
            sourceSelection: -1,
            squares,
            whiteFallenPieces: [
              ...oldState.whiteFallenPieces,
              ...whiteFallenPieces,
            ],
            blackFallenPieces: [
              ...oldState.blackFallenPieces,
              ...blackFallenPieces,
            ],
            player,
            status: "",
            turn,
          }));
        }
      } else {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
    }
  }

  restartGame = () => {
    this.setState({
      squares: initialiseChessBoard(),
      whiteFallenPieces: [],
      blackFallenPieces: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "white",
    });
  };

  getKingPosition(squares, player) {
    return squares.reduce(
      (acc, curr, i) =>
        acc ||
        (curr && curr.getPlayer() === player && curr instanceof King && i),
      null
    );
  }

  isCheckForPlayer(squares, player) {
    const opponent = player === 1 ? 2 : 1;
    const playersKingPosition = this.getKingPosition(squares, player);
    const canPieceKillPlayersKing = (piece, i) =>
      piece.isMovePossible(playersKingPosition, i, squares);
    return squares.reduce(
      (acc, curr, idx) =>
        acc ||
        (curr &&
          curr.getPlayer() === opponent &&
          canPieceKillPlayersKing(curr, idx) &&
          true),
      false
    );
  }

  render() {
    return (
      <div className="container">
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
            <div className="restart-button">
              <button className="restart" onClick={this.restartGame}>
                Restart
              </button>
            </div>
          </div>

          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">
              {
                <FallenPiecesBlock
                  whiteFallenPieces={this.state.whiteFallenPieces}
                  blackFallenPieces={this.state.blackFallenPieces}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
