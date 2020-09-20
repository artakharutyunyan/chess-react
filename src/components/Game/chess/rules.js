/* holds all the rules for piece movement such as: cannot jump pieces, cannot take same color pieces, and special rules for pawns and king
 * enforce functions returns (new) array with squares that break rules removed.
 * adding functions return new squares for special rules, and should be concated with passed move */
import {toCoord, WHITE_KING_SQUARE, BLACK_KING_SQUARE, NO_PIECE_ID } from './board';

// helper functions, subjects coords by one when accessing logical board (multi-dimensional array).
const toIndex = (ms) => ms.map((m) => ({ x: m.x - 1, y: m.y - 1 }));
const fromIndex = (mi) => mi.map((m) => ({x: m.x + 1, y: m.y + 1 }));

// helper function, returns true of moveIndex has no pieces between it and startIndex, coord is either x or y.
const meetsLatteralCuttoff = (moveIndex, startIndex, pieces, coord) => {
		if(moveIndex[coord] < startIndex[coord]) { // check left side of startIndex.
			return pieces
				.filter(mwp => mwp[coord] < startIndex[coord])  // filter out pieces to the right of startIndex.
				.filter(mwp => mwp[coord] > moveIndex[coord]).length === 0;
		} else if(moveIndex[coord] > startIndex[coord]) {
			return pieces
				.filter(mwp => mwp[coord] > startIndex[coord])
				.filter(mwp => mwp[coord] < moveIndex[coord]).length === 0;
		}
};

// Cutts of path of peices that move latterally and cannot jump other pieces.
export const enforceLatteralJump = (startSquare, moveSquares, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);
  // get all moves that have pieces on them.
	let movesWithPiecesOnThem = moveIndexes.filter(mi => { 
		return board[mi.y][mi.x] !== NO_PIECE_ID;
	});

  // filter out moves that do not meet latteral cuttoff, i.e moves that are 'after' in-way piece.
	let movesWithNoJumps = moveIndexes.filter(mi => {
		return meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'x')
		 || meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'y');
	});

	return fromIndex(movesWithNoJumps);
};

// Same thing as enforceLatteralJump, but works diagnally.
export const enforceDiagnalJump = (startSquare, moveSquares, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);

  let movesWithPiecesOnThem = moveIndexes.filter(mi => {
    return board[mi.y][mi.x] !== NO_PIECE_ID;
  });

  // group moves that are above/below start index.
  let upperPieces = movesWithPiecesOnThem.filter(mwp => mwp.y > startIndex.y);
  let lowerPieces = movesWithPiecesOnThem.filter(mwp => mwp.y < startIndex.y);

  let lowerMoves = moveIndexes
    .filter(mi => mi.y < startIndex.y)
    // use meets latteral cuttoff, in this case we only care about the x coord.
    .filter(mi => meetsLatteralCuttoff(mi, startIndex, lowerPieces, 'x')); 

  let upperMoves = moveIndexes
    .filter(mi => mi.y > startIndex.y)
    .filter(mi => meetsLatteralCuttoff(mi, startIndex, upperPieces, 'x'));

  return fromIndex(lowerMoves.concat(upperMoves));
};

// Removes squares that are at the 'end' of the move (after cuttoff rules have been enforced) that are the same color as moving piece.
export const enforceTakenSquare = (startSquare, moveSquares, isWhite, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);

	return fromIndex(moveIndexes.filter(mi => {
		let piece = board[mi.y][mi.x];
		return isWhite ? piece.toLowerCase() === piece : piece.toUpperCase() === piece;
	}));
}

// Add pawn take squares.  Pawns are special, their attack is not apart of their normal movement.  1-square long Diagnal moves are adding if pieces are there.
export const pawnCanTakeDiagnally = (startSquare, isWhite, board) => {
  let startIndex = toIndex([startSquare])[0];
  let moveIndexes = [];
  let yAdd = isWhite ? 1 : - 1;
  for(let i = -1; i <= 1; i+=2) {
    let index = { x: startIndex.x + i, y: startIndex.y + yAdd };

    if(index.x > 7 || index.x < 0) continue;
    let piece = board[index.y][index.x];

    if(piece !== NO_PIECE_ID)
      if(isWhite) {
        if(piece.toLowerCase() === piece)
          moveIndexes.push(index);
      } else {
        if(piece.toUpperCase() === piece)
          moveIndexes.push(index);
      }
  }

  return fromIndex(moveIndexes);
};

// Add king castle squares. 
export const kingCastle = (isWhite, board) => {
  // check if king is on correct square.
  let kingIndex = toIndex([toCoord(isWhite ? WHITE_KING_SQUARE : BLACK_KING_SQUARE)])[0];
  if(board[kingIndex.y][kingIndex.x].toLowerCase() !== 'k') return [];

  let moves = [];
  let kingRow = board[kingIndex.y];
  let hasPieceFilter = (p) => p !== NO_PIECE_ID;

  // check queen side castle.
  if(board[kingIndex.y][0].toLowerCase() === 'r') {
    let piecesInWay = [kingRow[1], kingRow[2], kingRow[3]].filter(hasPieceFilter).length !== 0;
    if(!piecesInWay) moves.push({ x: 2, y: kingIndex.y });
  }

  // check king side castle.
  if(board[kingIndex.y][7].toLowerCase() === 'r') {
    let piecesInWay = [kingRow[6], kingRow[5]].filter(hasPieceFilter).length !== 0;
    if(!piecesInWay) moves.push({ x: 6, y: kingIndex.y });
  }

  return fromIndex(moves);
};

// take out all coords that are not on the board.
export const enforceBoundary = (squares) => squares.filter(s => !(s.x > 8 || s.x < 1 || s.y > 8 || s.y < 1));
