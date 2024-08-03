// import moveSound from "./movesound.mp3";
// import captureSound from "./capturesound.mp3";
// import { isKingInCheck } from "./gamestate";

// let moveAudio = new Audio(moveSound);
// let captureAudio = new Audio(captureSound);

// export const isValidPawnMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board,
//   enPassant
// ) => {
//   const player = piece.includes("white") ? "white" : "black";
//   const opponent = player === "white" ? "black" : "white";

//   // Check for the king position
//   const kingPosition = Object.keys(board).find(
//     (key) => board[key] === `${opponent}king`
//   );

//   // Prevent capturing the opponent's king
//   if (toRow + "" + toCol === kingPosition) {
//     return false;
//   }

//   const direction = piece.includes("white") ? 1 : -1;

//   // Regular move
//   if (toCol === fromCol && board[toRow + "" + toCol] === null) {
//     if (toRow === fromRow + direction) {
//       moveAudio.play();
//       return true;
//     }
//     // Double move at start
//     if (
//       (fromRow === 1 && piece.includes("white") && toRow === 3) ||
//       (fromRow === 6 && piece.includes("black") && toRow === 4)
//     ) {
//       moveAudio.play();
//       return true;
//     }
//   }

//   // Capture move
//   if (
//     (Math.abs(toCol - fromCol) === 1 &&
//       toRow === fromRow + direction &&
//       board[toRow + "" + toCol] &&
//       board[toRow + "" + toCol].includes(opponent)) ||
//     (enPassant && toRow + "" + toCol === enPassant)
//   ) {
//     captureAudio.play();
//     return true;
//   }

//   return false;
// };

// export const isPawnPromotion = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board
// ) => {
//   const player = piece.includes("white") ? "white" : "black";
//   if (isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board)) {
//     if (
//       (player === "white" && toRow === 7) ||
//       (player === "black" && toRow === 0)
//     ) {
//       return true;
//     }
//   }
//   return false;
// };

// const isValidKnightMove = (fromRow, fromCol, toRow, toCol, piece, board) => {
//   const player = piece.includes("white") ? "white" : "black";
//   const opponent = player === "white" ? "black" : "white";

//   const rowDifference = toRow - fromRow;
//   const colDifference = toCol - fromCol;

//   const isLShaped =
//     (rowDifference === 2 && colDifference === 1) ||
//     (rowDifference === 1 && colDifference === 2) ||
//     (rowDifference === -1 && colDifference === 2) ||
//     (rowDifference === -2 && colDifference === 1) ||
//     (rowDifference === -2 && colDifference === -1) ||
//     (rowDifference === -1 && colDifference === -2) ||
//     (rowDifference === 1 && colDifference === -2) ||
//     (rowDifference === 2 && colDifference === -1);

//   if (!isLShaped) {
//     return false;
//   }

//   const targetPositionKey = toRow + "" + toCol;
//   const targetPiece = board[targetPositionKey];

//   if (targetPiece && targetPiece === `${opponent}king`) {
//     return false;
//   }

//   if (!targetPiece) {
//     moveAudio.play();
//     return true;
//   }

//   const isOpponentPiece = piece.includes("white")
//     ? targetPiece.includes("black")
//     : targetPiece.includes("white");

//   if (isOpponentPiece) {
//     captureAudio.play();
//     return true;
//   }

//   return false;
// };

// export const isValidBishopMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board
// ) => {
//   const player = piece.includes("white") ? "white" : "black";
//   const opponent = player === "white" ? "black" : "white";

//   const rowDiff = Math.abs(toRow - fromRow);
//   const colDiff = Math.abs(toCol - fromCol);

//   if (rowDiff !== colDiff) {
//     return false;
//   }

//   const rowDirection = toRow > fromRow ? 1 : -1;
//   const colDirection = toCol > fromCol ? 1 : -1;

//   let row = fromRow + rowDirection;
//   let col = fromCol + colDirection;

//   while (row !== toRow && col !== toCol) {
//     if (board[row + "" + col] !== null) {
//       return false;
//     }
//     row += rowDirection;
//     col += colDirection;
//   }

//   const targetPiece = board[toRow + "" + toCol];
//   if (targetPiece) {
//     if (targetPiece === `${opponent}king`) {
//       return false;
//     }

//     if (targetPiece.includes(player)) {
//       return false;
//     }
//   }

//   if (targetPiece && targetPiece.includes(opponent)) {
//     captureAudio.play();
//   } else {
//     moveAudio.play();
//   }

//   return true;
// };

// export const isValidRookMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board
// ) => {
//   const player = piece.includes("white") ? "white" : "black";
//   const opponent = player === "white" ? "black" : "white";

//   const rowDiff = Math.abs(toRow - fromRow);
//   const colDiff = Math.abs(toCol - fromCol);

//   if (rowDiff > 0 && colDiff > 0) {
//     return false;
//   }

//   const rowDirection = toRow > fromRow ? 1 : -1;
//   const colDirection = toCol > fromCol ? 1 : -1;

//   if (rowDiff > 0) {
//     let row = fromRow + rowDirection;
//     while (row !== toRow) {
//       if (board[row + "" + fromCol] !== null) {
//         return false;
//       }
//       row += rowDirection;
//     }
//   } else {
//     let col = fromCol + colDirection;
//     while (col !== toCol) {
//       if (board[fromRow + "" + col] !== null) {
//         return false;
//       }
//       col += colDirection;
//     }
//   }

//   const targetPiece = board[toRow + "" + toCol];
//   if (targetPiece && targetPiece === `${opponent}king`) {
//     return false;
//   }

//   if (targetPiece && targetPiece.includes(opponent)) {
//     captureAudio.play();
//   } else {
//     moveAudio.play();
//   }

//   return true;
// };

// export const isValidQueenMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board
// ) => {
//   const player = piece.includes("white") ? "white" : "black";
//   const opponent = player === "white" ? "black" : "white";

//   if (
//     isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board) ||
//     isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board)
//   ) {
//     const targetPiece = board[toRow + "" + toCol];
//     if (targetPiece && targetPiece === `${opponent}king`) {
//       return false;
//     }
//     return true;
//   }

//   return false;
// };

// export const isValidKingMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board
// ) => {
//   const rowDiff = toRow - fromRow;
//   const colDiff = toCol - fromCol;

//   const isOneCaseAround =
//     (rowDiff === 1 && colDiff === 0) ||
//     (rowDiff === 1 && colDiff === 1) ||
//     (rowDiff === 0 && colDiff === 1) ||
//     (rowDiff === -1 && colDiff === 1) ||
//     (rowDiff === -1 && colDiff === 0) ||
//     (rowDiff === -1 && colDiff === -1) ||
//     (rowDiff === 0 && colDiff === -1) ||
//     (rowDiff === 1 && colDiff === -1);

//   // Check if the move is a normal king move or castling
//   if (!isOneCaseAround) {
//     return false;
//   }

//   const targetPositionKey = toRow + "" + toCol;
//   const targetPiece = board[targetPositionKey];

//   if (!targetPiece) {
//     // Temporarily make the move and check if the king is in check
//     const newBoard = {
//       ...board,
//       [fromRow + "" + fromCol]: null,
//       [targetPositionKey]: piece,
//     };
//     if (
//       !isKingInCheck(
//         piece.includes("white") ? "white" : "black",
//         newBoard,
//         targetPositionKey
//       )
//     ) {
//       moveAudio.play();
//       return true;
//     }
//     return false;
//   }

//   const isOpponentPiece = piece.includes("white")
//     ? targetPiece.includes("black")
//     : targetPiece.includes("white");

//   if (isOpponentPiece) {
//     // Temporarily make the move and check if the king is in check
//     const newBoard = {
//       ...board,
//       [fromRow + "" + fromCol]: null,
//       [targetPositionKey]: piece,
//     };
//     if (
//       !isKingInCheck(
//         piece.includes("white") ? "white" : "black",
//         newBoard,
//         targetPositionKey
//       )
//     ) {
//       captureAudio.play();
//       return true;
//     }
//     return false;
//   }

//   return false;
// };

// export const isValidCastlingMove = (
//   fromRow,
//   fromCol,
//   toRow,
//   toCol,
//   piece,
//   board,
//   hasMoved
// ) => {
//   console.log(
//     `Checking castling from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol}) for ${piece}`
//   );
//   console.log("Has moved state in castling check:", hasMoved);

//   if (
//     !piece.includes("king") ||
//     Math.abs(toCol - fromCol) !== 2 ||
//     fromRow !== toRow
//   ) {
//     console.log("Not a castling move");
//     return false;
//   }

//   const player = piece.includes("white") ? "white" : "black";
//   const kingInitialPosition = player === "white" ? "04" : "74";
//   const rookInitialPositions = {
//     white: { left: "70", right: "77" },
//     black: { left: "00", right: "07" },
//   };

//   if (hasMoved === undefined) {
//     console.error("hasMoved is undefined in castling check");
//     return false;
//   }

//   if (hasMoved[`${player}King`] === undefined) {
//     console.error(`hasMoved.${player}King is undefined`);
//     return false;
//   }

//   if (hasMoved[`${player}King`]) {
//     console.log("King has moved from its initial position");
//     return false;
//   }

//   const rookSide = toCol > fromCol ? "right" : "left";
//   const rookInitialPosition = rookInitialPositions[player][rookSide];
//   const rookHasMoved =
//     hasMoved[
//       `${player}Rook${rookSide.charAt(0).toUpperCase() + rookSide.slice(1)}`
//     ];

//   if (rookHasMoved) {
//     console.log("Rook has moved from its initial position");
//     return false;
//   }

//   const colDirection = toCol > fromCol ? 1 : -1;
//   for (let col = fromCol + colDirection; col !== toCol; col += colDirection) {
//     if (board[fromRow + "" + col] !== null) {
//       console.log(`Path is not clear at (${fromRow}, ${col})`);
//       return false;
//     }
//   }

//   const tempBoard = { ...board };
//   const steps = [fromCol, fromCol + colDirection, toCol];
//   for (let col of steps) {
//     tempBoard[fromRow + "" + fromCol] = null;
//     tempBoard[fromRow + "" + col] = `${player}king`;
//     if (isKingInCheck(player, tempBoard, `${fromRow}${col}`)) {
//       console.log("King would be in check during castling");
//       return false;
//     }
//     tempBoard[fromRow + "" + col] = null;
//   }

//   console.log("Castling is valid");
//   return true;
// };

// export const isMoveValid = (
//   piece,
//   fromPosition,
//   toPosition,
//   board,
//   hasMoved,
//   enPassant
// ) => {
//   const pieceType = piece.replace(/(white|black)$/, "");
//   const fromRow = parseInt(fromPosition[0], 10);
//   const fromCol = parseInt(fromPosition[1], 10);
//   const toRow = parseInt(toPosition[0], 10);
//   const toCol = parseInt(toPosition[1], 10);

//   switch (pieceType) {
//     case "whitepawn":
//       if (
//         isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board, enPassant)
//       ) {
//         if (isPawnPromotion(fromRow, fromCol, toRow, toCol, piece, board)) {
//           console.log("Pawn promoted");
//         }
//         return true;
//       }
//       return false;
//     case "blackpawn":
//       if (
//         isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board, enPassant)
//       ) {
//         if (isPawnPromotion(fromRow, fromCol, toRow, toCol, piece, board)) {
//           console.log("Pawn promoted");
//         }
//         return true;
//       }
//       return false;
//     case "whiteknight":
//       return isValidKnightMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "blackknight":
//       return isValidKnightMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "whitebishop":
//       return isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "blackbishop":
//       return isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "whiterook":
//       return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "blackrook":
//       return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "whitequeen":
//       return isValidQueenMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "blackqueen":
//       return isValidQueenMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "whiteking":
//       if (
//         isValidCastlingMove(
//           fromRow,
//           fromCol,
//           toRow,
//           toCol,
//           piece,
//           board,
//           hasMoved
//         )
//       ) {
//         return true;
//       }
//       return isValidKingMove(fromRow, fromCol, toRow, toCol, piece, board);
//     case "blackking":
//       if (
//         isValidCastlingMove(
//           fromRow,
//           fromCol,
//           toRow,
//           toCol,
//           piece,
//           board,
//           hasMoved
//         )
//       ) {
//         return true;
//       }
//       return isValidKingMove(fromRow, fromCol, toRow, toCol, piece, board);
//     default:
//       return false;
//   }
// };

import moveSound from "./movesound.mp3";
import captureSound from "./capturesound.mp3";
import { isKingInCheck } from "./gamestate";

let moveAudio = new Audio(moveSound);
let captureAudio = new Audio(captureSound);

export const isValidPawnMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board,
  enPassant
) => {
  const player = piece.includes("white") ? "white" : "black";
  const opponent = player === "white" ? "black" : "white";

  // Check for the king position
  const kingPosition = Object.keys(board).find(
    (key) => board[key] === `${opponent}king`
  );

  // Prevent capturing the opponent's king
  if (toRow + "" + toCol === kingPosition) {
    return false;
  }

  const direction = piece.includes("white") ? 1 : -1;

  // Regular move
  if (toCol === fromCol && board[toRow + "" + toCol] === null) {
    if (toRow === fromRow + direction) {
      moveAudio.play();
      return true;
    }
    // Double move at start
    if (
      (fromRow === 1 && piece.includes("white") && toRow === 3) ||
      (fromRow === 6 && piece.includes("black") && toRow === 4)
    ) {
      moveAudio.play();
      return true;
    }
  }

  // Capture move
  if (
    (Math.abs(toCol - fromCol) === 1 &&
      toRow === fromRow + direction &&
      board[toRow + "" + toCol] &&
      board[toRow + "" + toCol].includes(opponent)) ||
    (enPassant && toRow + "" + toCol === enPassant)
  ) {
    captureAudio.play();
    return true;
  }

  return false;
};

export const isPawnPromotion = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board
) => {
  const player = piece.includes("white") ? "white" : "black";
  if (isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board)) {
    if (
      (player === "white" && toRow === 7) ||
      (player === "black" && toRow === 0)
    ) {
      return true;
    }
  }
  return false;
};

const isValidKnightMove = (fromRow, fromCol, toRow, toCol, piece, board) => {
  const player = piece.includes("white") ? "white" : "black";
  const opponent = player === "white" ? "black" : "white";

  const rowDifference = toRow - fromRow;
  const colDifference = toCol - fromCol;

  const isLShaped =
    (rowDifference === 2 && colDifference === 1) ||
    (rowDifference === 1 && colDifference === 2) ||
    (rowDifference === -1 && colDifference === 2) ||
    (rowDifference === -2 && colDifference === 1) ||
    (rowDifference === -2 && colDifference === -1) ||
    (rowDifference === -1 && colDifference === -2) ||
    (rowDifference === 1 && colDifference === -2) ||
    (rowDifference === 2 && colDifference === -1);

  if (!isLShaped) {
    return false;
  }

  const targetPositionKey = toRow + "" + toCol;
  const targetPiece = board[targetPositionKey];

  if (targetPiece && targetPiece === `${opponent}king`) {
    return false;
  }

  if (!targetPiece) {
    moveAudio.play();
    return true;
  }

  const isOpponentPiece = piece.includes("white")
    ? targetPiece.includes("black")
    : targetPiece.includes("white");

  if (isOpponentPiece) {
    captureAudio.play();
    return true;
  }

  return false;
};

export const isValidBishopMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board
) => {
  const player = piece.includes("white") ? "white" : "black";
  const opponent = player === "white" ? "black" : "white";

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff !== colDiff) {
    return false;
  }

  const rowDirection = toRow > fromRow ? 1 : -1;
  const colDirection = toCol > fromCol ? 1 : -1;

  let row = fromRow + rowDirection;
  let col = fromCol + colDirection;

  while (row !== toRow && col !== toCol) {
    if (board[row + "" + col] !== null) {
      return false;
    }
    row += rowDirection;
    col += colDirection;
  }

  const targetPiece = board[toRow + "" + toCol];
  if (targetPiece) {
    if (targetPiece === `${opponent}king`) {
      return false;
    }

    if (targetPiece.includes(player)) {
      return false;
    }
  }

  if (targetPiece && targetPiece.includes(opponent)) {
    captureAudio.play();
  } else {
    moveAudio.play();
  }

  return true;
};

export const isValidRookMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board
) => {
  const player = piece.includes("white") ? "white" : "black";
  const opponent = player === "white" ? "black" : "white";

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff > 0 && colDiff > 0) {
    return false;
  }

  const rowDirection = toRow > fromRow ? 1 : -1;
  const colDirection = toCol > fromCol ? 1 : -1;

  if (rowDiff > 0) {
    let row = fromRow + rowDirection;
    while (row !== toRow) {
      if (board[row + "" + fromCol] !== null) {
        return false;
      }
      row += rowDirection;
    }
  } else {
    let col = fromCol + colDirection;
    while (col !== toCol) {
      if (board[fromRow + "" + col] !== null) {
        return false;
      }
      col += colDirection;
    }
  }

  const targetPiece = board[toRow + "" + toCol];
  if (targetPiece && targetPiece === `${opponent}king`) {
    return false;
  }

  if (targetPiece && targetPiece.includes(opponent)) {
    captureAudio.play();
  } else {
    moveAudio.play();
  }

  return true;
};

export const isValidQueenMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board
) => {
  const player = piece.includes("white") ? "white" : "black";
  const opponent = player === "white" ? "black" : "white";

  if (
    isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board) ||
    isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board)
  ) {
    const targetPiece = board[toRow + "" + toCol];
    if (targetPiece && targetPiece === `${opponent}king`) {
      return false;
    }
    return true;
  }

  return false;
};

export const isValidKingMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board
) => {
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const player = piece.includes("white") ? "white" : "black";

  const isOneCaseAround =
    (rowDiff === 1 && colDiff === 0) ||
    (rowDiff === 1 && colDiff === 1) ||
    (rowDiff === 0 && colDiff === 1) ||
    (rowDiff === -1 && colDiff === 1) ||
    (rowDiff === -1 && colDiff === 0) ||
    (rowDiff === -1 && colDiff === -1) ||
    (rowDiff === 0 && colDiff === -1) ||
    (rowDiff === 1 && colDiff === -1);

  // Check if the move is a normal king move or castling
  if (!isOneCaseAround) {
    return false;
  }

  const targetPositionKey = toRow + "" + toCol;
  const targetPiece = board[targetPositionKey];

  if (!targetPiece) {
    // Temporarily make the move and check if the king is in check
    const newBoard = {
      ...board,
      [fromRow + "" + fromCol]: null,
      [targetPositionKey]: piece,
    };
    if (
      !isKingInCheck(
        piece.includes("white") ? "white" : "black",
        newBoard,
        targetPositionKey
      )
    ) {
      moveAudio.play();
      return true;
    }
    return false;
  }

  const isOpponentPiece = piece.includes("white")
    ? targetPiece.includes("black")
    : targetPiece.includes("white");

  if (isOpponentPiece) {
    // Temporarily make the move and check if the king is in check
    const newBoard = {
      ...board,
      [fromRow + "" + fromCol]: null,
      [targetPositionKey]: piece,
    };
    if (
      !isKingInCheck(
        piece.includes("white") ? "white" : "black",
        newBoard,
        targetPositionKey
      )
    ) {
      captureAudio.play();
      return true;
    }
  }

  if (isValidCastlingMove) {
    if (player === "white") {
      if (toRow === 0 && toCol === 6) {
        if (board["07"] === "whiterookright") {
          board["07"] = null;
          board["05"] = "whiterookright";
          return true;
        }
      }
      if (toRow === 0 && toCol === 2) {
        if (board["00"] === "whiterookleft") {
          return true;
        }
      }
    } else if (player === "black") {
      if (toRow === 7 && toCol === 6) {
        if (board["77"] === "blackrookright") {
          return true;
        }
      }
      if (toRow === 7 && toCol === 2) {
        if (board["70"] === "blackrookleft") {
          return true;
        }
      }
    }
  }

  return false;
};

export const isValidCastlingMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  board,
  hasMoved
) => {
  console.log(
    `Checking castling from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol}) for ${piece}`
  );
  console.log("Has moved state in castling check:", hasMoved);

  if (
    !piece.includes("king") ||
    Math.abs(toCol - fromCol) !== 2 ||
    fromRow !== toRow
  ) {
    console.log("Not a castling move");
    return false;
  }

  const player = piece.includes("white") ? "white" : "black";
  const rookInitialPositions = {
    white: { left: "00", right: "07" },
    black: { left: "70", right: "77" },
  };

  if (hasMoved === undefined) {
    console.error("hasMoved is undefined in castling check");
    return false;
  }

  // Check if the king has already moved
  if (hasMoved[`${player}King`]) {
    console.log("King has already moved");
    return false;
  }

  const rookSide = toCol > fromCol ? "right" : "left";
  const rookInitialPosition = rookInitialPositions[player][rookSide];

  // Check if the rook has already moved
  if (
    hasMoved[
      `${player}Rook${rookSide.charAt(0).toUpperCase() + rookSide.slice(1)}`
    ]
  ) {
    console.log("Rook has already moved");
    return false;
  }

  const colDirection = toCol > fromCol ? 1 : -1;
  for (let col = fromCol + colDirection; col !== toCol; col += colDirection) {
    if (board[fromRow + "" + col] !== null) {
      console.log(`Path is not clear at (${fromRow}, ${col})`);
      return false;
    }
  }

  const tempBoard = { ...board };
  const steps = [fromCol, fromCol + colDirection, toCol];
  for (let col of steps) {
    tempBoard[fromRow + "" + fromCol] = null;
    tempBoard[fromRow + "" + col] = `${player}king`;
    if (isKingInCheck(player, tempBoard, `${fromRow}${col}`)) {
      console.log("King would be in check during castling");
      return false;
    }
    tempBoard[fromRow + "" + col] = null;
  }

  console.log("Castling is valid");
  return true;
};

export const isMoveValid = (
  piece,
  fromPosition,
  toPosition,
  board,
  hasMoved,
  enPassant
) => {
  const pieceType = piece.replace(/(white|black)$/, "");
  const fromRow = parseInt(fromPosition[0], 10);
  const fromCol = parseInt(fromPosition[1], 10);
  const toRow = parseInt(toPosition[0], 10);
  const toCol = parseInt(toPosition[1], 10);

  switch (pieceType) {
    case "whitepawn":
      if (
        isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board, enPassant)
      ) {
        if (isPawnPromotion(fromRow, fromCol, toRow, toCol, piece, board)) {
          console.log("Pawn promoted");
        }
        return true;
      }
      return false;
    case "blackpawn":
      if (
        isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board, enPassant)
      ) {
        if (isPawnPromotion(fromRow, fromCol, toRow, toCol, piece, board)) {
          console.log("Pawn promoted");
        }
        return true;
      }
      return false;
    case "whiteknight":
      return isValidKnightMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackknight":
      return isValidKnightMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "whitebishop":
      return isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackbishop":
      return isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "whiterookleft":
      return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "whiterookright":
      return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackrookleft":
      return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackrookright":
      return isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "whitequeen":
      return isValidQueenMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackqueen":
      return isValidQueenMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "whiteking":
      if (
        isValidCastlingMove(
          fromRow,
          fromCol,
          toRow,
          toCol,
          piece,
          board,
          hasMoved
        )
      ) {
        return true;
      }
      return isValidKingMove(fromRow, fromCol, toRow, toCol, piece, board);
    case "blackking":
      if (
        isValidCastlingMove(
          fromRow,
          fromCol,
          toRow,
          toCol,
          piece,
          board,
          hasMoved
        )
      ) {
        return true;
      }
      return isValidKingMove(fromRow, fromCol, toRow, toCol, piece, board);
    default:
      return false;
  }
};
