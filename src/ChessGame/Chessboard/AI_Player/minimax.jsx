import {
  getPossiblePawnMoves,
  getAllPossibleKingMoves,
  getAllPossibleBishopMoves,
  getAllPossibleRookMoves,
  getAllPossibleQueenMoves,
  getAllPossibleKnightMoves,
  isKingInCheck,
} from "../gamestate";

const pieceValues = {
  whitepawn: 10,
  whiteknight: 30,
  whitebishop: 50,
  whiterookleft: 50,
  whiterookright: 50,
  whitequeen: 90,
  whiteking: 900,
  blackpawn: -10,
  blackknight: -30,
  blackbishop: -50,
  blackrookleft: -50,
  blackrookright: -50,
  blackqueen: -90,
  blackking: -900,
};

const simulateMove = (board, from, to) => {
  const newBoard = { ...board };
  newBoard[to] = newBoard[from];
  newBoard[from] = null;
  return newBoard;
};

const getAllMovesForPlayer = (player, board) => {
  let possibleMoves = [];

  for (const keys in board) {
    const row = parseInt(keys[0], 10);
    const col = parseInt(keys[1], 10);
    let moves = [];

    if (board[keys] === `${player}pawn`) {
      moves = getPossiblePawnMoves(row, col, `${player}pawn`, board);
    } else if (
      board[keys] === `${player}rookleft` ||
      board[keys] === `${player}rookright`
    ) {
      moves = getAllPossibleRookMoves(row, col, board);
    } else if (board[keys] === `${player}knight`) {
      moves = getAllPossibleKnightMoves(row, col, board);
    } else if (board[keys] === `${player}bishop`) {
      moves = getAllPossibleBishopMoves(row, col, board);
    } else if (board[keys] === `${player}queen`) {
      moves = getAllPossibleQueenMoves(row, col, board);
    } else if (board[keys] === `${player}king`) {
      moves = getAllPossibleKingMoves(row, col, board);
    }

    if (moves.length > 0) {
      possibleMoves.push(...moves.map((move) => ({ from: keys, to: move })));
    }
  }

  const validPossibleMoves = possibleMoves.filter(
    (move) => !board[move.to]?.includes(player)
  );

  const kingPosition = Object.keys(board).find(
    (key) => board[key] === `${player}king`
  );

  const safeMoves = validPossibleMoves.filter((move) => {
    const newBoard = simulateMove(board, move.from, move.to);
    const newKingPosition =
      board[move.from] === `${player}king` ? move.to : kingPosition;
    return !isKingInCheck(player, newBoard, newKingPosition);
  });

  return safeMoves;
};

const evaluateBoard = (board) => {
  let totalEvaluation = 0;
  for (const key in board) {
    totalEvaluation += pieceValues[board[key]] || 0;
  }
  return totalEvaluation;
};

const minimax = (board, depth, maximizingPlayer, alpha, beta) => {
  if (depth === 0) {
    return evaluateBoard(board);
  }

  const player = maximizingPlayer ? "black" : "white";
  let bestEval = maximizingPlayer ? -Infinity : Infinity;

  const moves = getAllMovesForPlayer(player, board);

  for (let move of moves) {
    const isCapture = board[move.to] && !board[move.to].includes(player);
    const capturedValue = isCapture ? pieceValues[board[move.to]] : 0;
    const newBoard = simulateMove(board, move.from, move.to);
    const evaluation =
      minimax(newBoard, depth - 1, !maximizingPlayer, alpha, beta) +
      capturedValue;

    if (maximizingPlayer) {
      bestEval = Math.max(bestEval, evaluation);
      alpha = Math.max(alpha, bestEval);
    } else {
      bestEval = Math.min(bestEval, evaluation);
      beta = Math.min(beta, bestEval);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return bestEval;
};

export const getBestMove = (board, depth) => {
  let bestMoves = [];
  let bestEval = -Infinity;
  const moves = getAllMovesForPlayer("black", board);

  for (let move of moves) {
    const isCapture = board[move.to] && !board[move.to].includes("black");
    const capturedValue = isCapture ? pieceValues[board[move.to]] : 0;
    const newBoard = simulateMove(board, move.from, move.to);
    const evaluation =
      minimax(newBoard, depth, false, -Infinity, Infinity) + capturedValue;
    if (evaluation > bestEval) {
      bestEval = evaluation;
      bestMoves = [move];
    } else if (evaluation === bestEval) {
      bestMoves.push(move);
    }
  }

  // Select a random move from the best moves
  const bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
  return bestMove;
};

export const makeAIMove = (board, depth) => {
  const bestMove = getBestMove(board, depth);
  if (bestMove) {
    return simulateMove(board, bestMove.from, bestMove.to);
  }
  return board;
};
