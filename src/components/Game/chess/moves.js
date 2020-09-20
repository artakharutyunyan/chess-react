/* Holds all the moves for a piece, relative to the given square.  It does not know any special rules, or even the scope of the board */
export const pawn = (x, y, white) => {
  var move;
  if (white) {
    if (y === 2)
      move = [
        { x, y: y + 1 },
        { x, y: y + 2 },
      ];
    else move = [{ x, y: y + 1 }];
  } else {
    if (y === 7)
      move = [
        { x, y: y - 1 },
        { x, y: y - 2 },
      ];
    else move = [{ x, y: y - 1 }];
  }
  return move;
};

export const knight = (x, y) => {
  return [
    { x: x + 1, y: y + 2 },
    { x: x + 1, y: y - 2 },
    { x: x - 1, y: y + 2 },
    { x: x - 1, y: y - 2 },
    { x: x - 2, y: y + 1 },
    { x: x - 2, y: y - 1 },
    { x: x + 2, y: y + 1 },
    { x: x + 2, y: y - 1 },
  ];
};

export const bishop = (x, y) => {
  let moves = [];
  for (let i = 1; i <= 8; i++) {
    moves.push({ x: x - i, y: y - i });
    moves.push({ x: x + i, y: y - i });
    moves.push({ x: x + i, y: y + i });
    moves.push({ x: x - i, y: y + i });
  }

  return moves;
};

export const rook = (x, y) => {
  let moves = [];
  for (let i = 1; i <= 8; i++) {
    moves.push({ x, y: y - i });
    moves.push({ x, y: y + i });
    moves.push({ x: x + i, y });
    moves.push({ x: x - i, y });
  }

  return moves;
};

export const king = (x, y) => {
  return [
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 1 },
  ];
};
