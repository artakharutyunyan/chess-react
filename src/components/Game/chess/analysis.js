/* Game board analysis, handles castling, checks, en-passants, pawn promotion and move notation. */

import { WHITE_KING_SQUARE, 
         WHITE_K_AFTER_KING_CASTLE, 
         WHITE_K_AFTER_QUEEN_CASTLE,
         BLACK_KING_SQUARE, 
         BLACK_K_AFTER_KING_CASTLE, 
         BLACK_K_AFTER_QUEEN_CASTLE, 
         NO_PIECE_ID,
         toSquare} from './board';
import { pieceMap } from './engine';

const wasCastle = (fromSquare, toSquare, after) => {
    return (fromSquare === WHITE_KING_SQUARE || fromSquare === BLACK_KING_SQUARE)
       &&  (toSquare === after);
};

export const wasKingCastle = (fromSquare, toSquare, piece) => {
  if(piece.toLowerCase() !== 'k') return false;
  return wasCastle(fromSquare, toSquare, 
    piece.toLowerCase() === piece ? BLACK_K_AFTER_KING_CASTLE : WHITE_K_AFTER_KING_CASTLE);
}
        
export const wasQueenCastle = (fromSquare, toSquare, piece) => {
  if(piece.toLowerCase() !== 'k') return false;
  return wasCastle(fromSquare, toSquare, 
    piece.toLowerCase() === piece ? BLACK_K_AFTER_QUEEN_CASTLE : WHITE_K_AFTER_QUEEN_CASTLE);
};

export const doesMovePutKingInCheck = (moves, kingPiece, board) => {
  let row = board.filter(r => r.includes(kingPiece))[0];
  let kingCoord = {
    x: row.indexOf(kingPiece) + 1,
    y: board.indexOf(row) + 1
  };

  return moves
    .filter(ms => ms.x === kingCoord.x && ms.y === kingCoord.y)
    .length !== 0;
};

export const isKingInCheck = (board, kingColorIsWhite) => {
  let check = false;

  let kingPiece = kingColorIsWhite ? 'K' : 'k';
  board.forEach((r, i) => r.forEach((p, j) => {
    if(check) return;
    if(p.toLowerCase() === 'k') return;
    if(p === NO_PIECE_ID) return;

    if(kingColorIsWhite && p.toUpperCase() === p) return;
    if(!kingColorIsWhite && p.toLowerCase() === p) return;

    let moves = pieceMap[p](j + 1, i + 1, p.toUpperCase() === p, board);
    check = doesMovePutKingInCheck(moves, kingPiece, board);
  }));

  return check;
};

// Returns all squareIds that contain pieceId.
export const getSquaresOfPiece = (pieceId, board) => {
  let squares = [];
  // column a starts at the end of the row array, hence the reverse call.
  board.forEach( (r, i) => r.forEach( (p, j) => {
    if(p === pieceId) 
      squares.push(toSquare({ x: j + 1, y: i + 1 }));
  }));

  return squares;
};

// Takes move action and returns a move notation. https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
export const toMoveNotation = (pieceId, toSquareId, fromSquareId, isTake) => {
  let move = '';
  let isPawn = pieceId.toLowerCase() === 'p';
  let isKing = pieceId.toLowerCase() === 'k';

  // helper function that updates the variables in the outer scope.
  let standardMove = () => {
    move += pieceId;
    if(isTake) move += 'x';
    move += toSquareId;
  };

  // standard move notation if piece is not a pawn or king.
  if(!isPawn && !isKing) {
    standardMove();
  } else if(isPawn) {
    // if it is a pawn, notation is just the toSquare, unless it's a take.
    if(!isTake) move += toSquareId;
    else move += fromSquareId.split('')[0] + 'x' + toSquareId.split('')[0]; // take is {column-start}x{column-end}
  } else if(isKing) {
    // castling notation is 0-0 for king side or 0-0-0 for queen side.
    var toKing, toQueen, king;
    if(pieceId.toLowerCase() === pieceId) {
      toKing = BLACK_K_AFTER_KING_CASTLE;
      toQueen = BLACK_K_AFTER_QUEEN_CASTLE;
      king = BLACK_KING_SQUARE;
    } else {
      toKing = WHITE_K_AFTER_KING_CASTLE;
      toQueen = WHITE_K_AFTER_QUEEN_CASTLE;
      king = WHITE_KING_SQUARE;
    }

    if(toSquareId === toKing && fromSquareId === king) move = '0-0';
    else if(toSquareId === toQueen && fromSquareId === king) move = '0-0-0';
    else standardMove(); // if last move was not a castle, king uses standard notation.
  }  

  return move;
};
