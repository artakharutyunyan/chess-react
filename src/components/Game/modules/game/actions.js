export const CASTLE_KING_SIDE = 'chess/game/castle_king';
export const CASTLE_QUEEN_SIDE = 'chess/game/castle_queen';
export const ANALYZE_BOARD = 'chess/game/analyze';
export const ADD_MOVE = 'chess/game/add_move';

// analyze board action is handled by the analysis middle ware.
export const analyzeBoard = (fromSquare, toSquare, piece) => ({
  type: ANALYZE_BOARD,
  fromSquare,
  toSquare,
  piece
});
export const castleKingSide = (isWhite) => ({ type: CASTLE_KING_SIDE, isWhite });
export const castleQueenSide = (isWhite) => ({ type: CASTLE_QUEEN_SIDE, isWhite });

export const addMove = (pieceId, toSquareId, fromSquareId, isTake) => ({
  type: ADD_MOVE,
  pieceId,
  toSquareId,
  fromSquareId,
  isTake
});

