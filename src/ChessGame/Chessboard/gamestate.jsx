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

export const isKingInCheck = (player, board, kingPosition) => {
  if (!kingPosition) {
    console.error(`King position for ${player} is undefined`);
    return false;
  }
  console.log(`King position for ${player}:`, kingPosition);

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
          `${piece} at ${key} can move to the king at ${kingPosition}, KING IN CHECK`
        );
        return true;
      }
    }

    return false;
  });
};

export const isCheckMate = (player, board) => {
  const opponent = player === "white" ? "black" : "white";

  // Obtain the King's position
  let kingPosition = Object.keys(board).find(
    (key) => board[key] === `${player}king`
  );

  // Error check
  if (!kingPosition) {
    console.error(`King position for ${player} is undefined`);
    return false;
  }

  console.log(
    "Inside checkmate function looking for king position ",
    kingPosition
  );

  const fromRow = parseInt(kingPosition[0], 10);
  const fromCol = parseInt(kingPosition[1], 10);

  // Get all of the options where the current king can move
  let currentKingPossibleMoves = getAllPossibleKingMoves(
    fromRow,
    fromCol,
    board
  );

  console.log(
    `These are the current positions available to the king before any verification: ${currentKingPossibleMoves}`
  );

  //console.log(`The board: ${JSON.stringify(board)}`);

  // Filter out invalid king moves
  const validKingMoves = currentKingPossibleMoves.filter((move) => {
    // Check if the move lands on a square occupied by the same color piece
    if (board[move] && board[move].includes(player)) {
      console.log(
        `Move to ${move} is invalid because it is occupied by the same color piece.`
      );
      return false;
    }

    // Create a temporary board state to test if the move leaves the king in check
    const tempBoard = {
      ...board,
      [kingPosition]: null,
      [move]: `${player}king`,
    };

    // console.log(
    //   `Testing move: ${move}, Temporary board state: ${JSON.stringify(
    //     tempBoard
    //   )}`
    // );

    const isMoveValid = !isKingInCheck(player, tempBoard, move);
    console.log(`Move to ${move} is ${isMoveValid ? "valid" : "invalid"}`);
    return isMoveValid;
  });

  console.log(`Valid king moves after verification: ${validKingMoves}`);
  console.log(`Valid king moves length: ${validKingMoves.length}`);

  // If the king has valid moves, it's not checkmate
  if (validKingMoves.length > 0) {
    return false;
  }

  if (validKingMoves.length === 0) {
    console.log(`${player} king is in checkmate`);
    return true;
  }

  // Check if any piece can capture the threatening piece or block the threat
  const playerPieces = Object.keys(board).filter(
    (key) => board[key] && board[key].includes(player)
  );

  for (let fromPosition of playerPieces) {
    const piece = board[fromPosition];
    const fromRow = parseInt(fromPosition[0], 10);
    const fromCol = parseInt(fromPosition[1], 10);
    let possibleMoves = [];

    if (piece.includes("queen")) {
      possibleMoves = getAllPossibleQueenMoves(fromRow, fromCol, board);
    } else if (piece.includes("rook")) {
      possibleMoves = getAllPossibleRookMoves(fromRow, fromCol, board);
    } else if (piece.includes("bishop")) {
      possibleMoves = getAllPossibleBishopMoves(fromRow, fromCol, board);
    } else if (piece.includes("knight")) {
      possibleMoves = getAllPossibleKnightMoves(fromRow, fromCol, board);
    } else if (piece.includes("pawn")) {
      possibleMoves = getPossiblePawnMoves(fromRow, fromCol, piece, board);
    }

    for (let move of possibleMoves) {
      const tempBoard = { ...board, [fromPosition]: null, [move]: piece };

      if (!isKingInCheck(player, tempBoard, kingPosition)) {
        return false; // There is a move that can capture or block the threat
      }
    }
  }

  // If no valid king moves and no way to capture/block the threat, it's checkmate
  if (isKingInCheck(player, board, kingPosition)) {
    console.log(`${player} king is in checkmate`);
    return true;
  }

  return false;
};
