export const ROUTE_PIECE = 'chess/piece/route';
export const MOVE_PIECE = 'chess/piece/move';
export const TAKE_PIECE = 'chess/piece/take';

export const ADD_TAKEN_PIECE = 'chess/pieces/taken';

// route piece action, updates all squares in state that are possible moves for pieceId at squareId.
export const routePiece = (squareId, pieceId) => ({
	type: ROUTE_PIECE,
	squareId,
	pieceId
});

// handled by chess middleware, middleware looks at state for selected square, if non then nothing happens.
export const movePiece = (toSquareId) => ({
	type: MOVE_PIECE,
	toSquareId
});

export const takePiece = (toSquareId) => ({
  type: TAKE_PIECE,
  toSquareId
});

// directly handled by reducer, this updates the list of taken pieces, adds and removes for pawn promotion.
export const addTakenPiece = (pieceId, color) => ({
  type: ADD_TAKEN_PIECE,
  pieceId,
  color
});

