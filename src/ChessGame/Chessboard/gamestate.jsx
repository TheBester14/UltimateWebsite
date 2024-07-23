import { isMoveValid } from "./movementRules";

export const getPossiblePawnMoves = (fromRow, fromCol, piece, board) => {
  const direction = piece.includes("white") ? 1 : -1;
  const possibleMoves = [];

  // Regular move
  if (board[fromRow + direction + "" + fromCol] === null) {
    possibleMoves.push(fromRow + direction + "" + fromCol);
  }

  // Double move at start
  if (
    (fromRow === 1 &&
      piece.includes("white") &&
      board["3" + fromCol] === null &&
      board["2" + fromCol] === null) ||
    (fromRow === 6 &&
      piece.includes("black") &&
      board["4" + fromCol] === null &&
      board["5" + fromCol] === null)
  ) {
    possibleMoves.push(fromRow + 2 * direction + "" + fromCol);
  }

  // Capture move
  if (
    board[fromRow + direction + "" + (fromCol + 1)] &&
    board[fromRow + direction + "" + (fromCol + 1)].includes(
      piece.includes("white") ? "black" : "white"
    )
  ) {
    possibleMoves.push(fromRow + direction + "" + (fromCol + 1));
  }
  if (
    board[fromRow + direction + "" + (fromCol - 1)] &&
    board[fromRow + direction + "" + (fromCol - 1)].includes(
      piece.includes("white") ? "black" : "white"
    )
  ) {
    possibleMoves.push(fromRow + direction + "" + (fromCol - 1));
  }

  return possibleMoves;
};

export const getAllPossibleQueenMoves = (fromRow, fromCol, board) => {
  const possibleMoves = [];

  // Directions the queen can move (combination of rook and bishop directions)
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Down-right
    [-1, -1], // Up-left
    [1, -1], // Down-left
    [-1, 1], // Up-right
  ];

  for (let [rowIncrement, colIncrement] of directions) {
    let row = fromRow + rowIncrement;
    let col = fromCol + colIncrement;
    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const positionKey = row + "" + col;
      const targetPiece = board[positionKey];
      possibleMoves.push(positionKey);

      if (targetPiece) break; // Stop if there is a piece in the way

      row += rowIncrement;
      col += colIncrement;
    }
  }

  return possibleMoves;
};

export const getAllPossibleRookMoves = (fromRow, fromCol, board) => {
  const possibleMoves = [];

  // Directions the rook can move
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
  ];

  for (let [rowIncrement, colIncrement] of directions) {
    let row = fromRow + rowIncrement;
    let col = fromCol + colIncrement;
    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const positionKey = row + "" + col;
      const targetPiece = board[positionKey];
      possibleMoves.push(positionKey);

      if (targetPiece) break; // Stop if there is a piece in the way

      row += rowIncrement;
      col += colIncrement;
    }
  }

  return possibleMoves;
};

export const getAllPossibleBishopMoves = (fromRow, fromCol, board) => {
  const possibleMoves = [];

  // Directions the bishop can move
  const directions = [
    [1, 1], // Down-right
    [-1, -1], // Up-left
    [1, -1], // Down-left
    [-1, 1], // Up-right
  ];

  for (let [rowIncrement, colIncrement] of directions) {
    let row = fromRow + rowIncrement;
    let col = fromCol + colIncrement;
    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const positionKey = row + "" + col;
      const targetPiece = board[positionKey];
      possibleMoves.push(positionKey);

      if (targetPiece) break; // Stop if there is a piece in the way

      row += rowIncrement;
      col += colIncrement;
    }
  }

  return possibleMoves;
};

export const getAllPossibleKnightMoves = (fromRow, fromCol, board) => {
  const possibleMoves = [];

  // Knight moves in L-shape
  const moves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  for (let [rowIncrement, colIncrement] of moves) {
    const row = fromRow + rowIncrement;
    const col = fromCol + colIncrement;
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      possibleMoves.push(row + "" + col);
    }
  }

  return possibleMoves;
};

export const getAllPossibleKingMoves = (fromRow, fromCol, board) => {
  const possibleMoves = [];

  // King moves one square in any direction
  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  for (let [rowIncrement, colIncrement] of moves) {
    const row = fromRow + rowIncrement;
    const col = fromCol + colIncrement;
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      possibleMoves.push(row + "" + col);
    }
  }

  return possibleMoves;
};

export const isKingInCheck = (player, board) => {
  // Find king's position
  const kingPosition = Object.keys(board).find(
    (key) => board[key] === `${player}king`
  );
  console.log(`King position for ${player}:`, kingPosition);

  // Check if any opponent piece can move to the king's position
  const opponentColor = player === "white" ? "black" : "white";
  return Object.keys(board).some((key) => {
    const piece = board[key];
    const fromRow = parseInt(key[0], 10);
    const fromCol = parseInt(key[1], 10);

    if (piece && piece.includes(opponentColor)) {
      let possibleMoves = [];

      if (piece.includes("queen")) {
        possibleMoves = getAllPossibleQueenMoves(fromRow, fromCol, board);
      } else if (piece.includes("rook")) {
        possibleMoves = getAllPossibleRookMoves(fromRow, fromCol, board);
      } else if (piece.includes("bishop")) {
        possibleMoves = getAllPossibleBishopMoves(fromRow, fromCol, board);
      } else if (piece.includes("knight")) {
        possibleMoves = getAllPossibleKnightMoves(fromRow, fromCol, board);
      } else if (piece.includes("king")) {
        possibleMoves = getAllPossibleKingMoves(fromRow, fromCol, board);
      } else if (piece.includes("pawn")) {
        possibleMoves = getPossiblePawnMoves(fromRow, fromCol, piece, board);
      }

      if (possibleMoves.includes(kingPosition)) {
        console.log(
          `${piece} at ${key} can move to the king at ${kingPosition}`
        );
        return true;
      }
    }

    return false;
  });
};

export const isCheckMate = (player, board) => {
  // Check if the king is currently in check
  if (!isKingInCheck(player, board)) return false;

  // Get all pieces of the current player
  const playerPieces = Object.keys(board).filter(
    (key) => board[key] && board[key].includes(player)
  );

  // Check if any piece has a valid move that would get the king out of check
  for (let fromPosition of playerPieces) {
    const piece = board[fromPosition];
    for (let toPosition of Object.keys(board)) {
      const tempBoard = { ...board, [fromPosition]: null, [toPosition]: piece };
      if (isMoveValid(piece, fromPosition, toPosition, board)) {
        if (!isKingInCheck(player, tempBoard)) {
          return false;
        }
      }
    }
  }

  return true; // The player is in checkmate if no valid moves resolve the check
};
