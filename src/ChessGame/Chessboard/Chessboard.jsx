import React, { useState } from "react";
import "./Chessboard.css";
import initialBoardSetup from "./initialBoardSetup";
import ChessPiece from "./ChessPiece";
import { isMoveValid, isValidCastlingMove } from "./movementRules";
import {
  isKingInCheck,
  isCheckMate,
  getAllPossibleQueenMoves,
  getAllPossibleRookMoves,
  getAllPossibleBishopMoves,
  getAllPossibleKnightMoves,
  getPossiblePawnMoves,
  getAllPossibleKingMoves,
} from "./gamestate";

const Chessboard = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [inCheck, setInCheck] = useState(false);
  const [checkMate, setCheckMate] = useState(false);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [hasMoved, setHasMoved] = useState({
    whiteKing: false,
    blackKing: false,
    whiteRookLeft: false,
    whiteRookRight: false,
    blackRookLeft: false,
    blackRookRight: false,
  });
  const [enPassant, setEnPassant] = useState(null);

  const handleTileClick = (position) => {
    try {
      console.log("Clicked position:", position);
      console.log("Selected piece:", selectedPiece);

      if (selectedPiece) {
        if (
          board[position] &&
          board[position].includes(
            board[selectedPiece].includes("white") ? "white" : "black"
          )
        ) {
          console.log("Switching selected piece to:", board[position]);
          setSelectedPiece(position);
          updatePossibleMoves(position);
        } else if (
          isMoveValid(
            board[selectedPiece],
            selectedPiece,
            position,
            board,
            hasMoved,
            enPassant
          )
        ) {
          let newBoard = {
            ...board,
            [selectedPiece]: null,
            [position]: board[selectedPiece],
          };

          const toRow = parseInt(position[0], 10);
          const fromRow = parseInt(selectedPiece[0], 10);
          const fromCol = parseInt(selectedPiece[1], 10);
          const toCol = parseInt(position[1], 10);

          // Castling move
          if (
            Math.abs(toCol - fromCol) === 2 &&
            board[selectedPiece].includes("king")
          ) {
            const rookFromCol = toCol > fromCol ? 7 : 0;
            const rookToCol = toCol > fromCol ? toCol - 1 : toCol + 1;
            const rookPosition = `${fromRow}${rookFromCol}`;
            const rookNewPosition = `${fromRow}${rookToCol}`;
            newBoard[rookNewPosition] = newBoard[rookPosition];
            newBoard[rookPosition] = null;
          }
          // En passant
          if (
            board[selectedPiece].includes("pawn") &&
            enPassant &&
            position === enPassant
          ) {
            newBoard[`${fromRow}${toCol}`] = null; // remove the captured pawn
          }

          // Promotion to queen
          if (board[selectedPiece] === "whitepawn" && toRow === 7) {
            newBoard[position] = "whitequeen";
          } else if (board[selectedPiece] === "blackpawn" && toRow === 0) {
            newBoard[position] = "blackqueen";
          }
          // Update en Passant state

          if (
            board[selectedPiece].includes("pawn") &&
            Math.abs(toRow - fromRow) === 2
          ) {
            // Check if the pawn lands right next to an opponent's pawn
            const leftPosition = `${toRow}${toCol - 1}`;
            const rightPosition = `${toRow}${toCol + 1}`;
            if (
              (board[leftPosition] &&
                board[leftPosition].includes(
                  currentPlayer === "white" ? "black" : "white"
                )) ||
              (board[rightPosition] &&
                board[rightPosition].includes(
                  currentPlayer === "white" ? "black" : "white"
                ))
            ) {
              setEnPassant(`${(fromRow + toRow) / 2}${fromCol}`);
            } else {
              setEnPassant(null);
            }
          } else {
            setEnPassant(null);
          }

          // Update movement tracking
          if (board[selectedPiece].includes("king")) {
            setHasMoved((prev) => ({
              ...prev,
              [`${currentPlayer}King`]: true,
            }));
          } else if (board[selectedPiece].includes("rook")) {
            const rookSide = fromCol === 0 ? "Left" : "Right";
            setHasMoved((prev) => ({
              ...prev,
              [`${currentPlayer}Rook${rookSide}`]: true,
            }));
          }

          if (isKingInCheck(currentPlayer, newBoard)) {
            console.log("Move is invalid, it leaves the king in check");
          } else {
            console.log("Move is valid");
            setBoard(newBoard);
            setPossibleMoves([]);
            setSelectedPiece(null); // Deselect after a valid move
            const opponentColor = currentPlayer === "white" ? "black" : "white";
            setCurrentPlayer(opponentColor);

            if (isKingInCheck(opponentColor, newBoard)) {
              setInCheck(true);
              console.log(`${opponentColor} king is in check!`);
              if (isCheckMate(opponentColor, newBoard)) {
                setCheckMate(true);
                console.log(`${opponentColor} king is in checkmate!`);
              }
            } else {
              setInCheck(false);
              setCheckMate(false);
            }
          }
        } else {
          console.log("Move is invalid");
          setSelectedPiece(null);
          setPossibleMoves([]);
        }
      } else if (board[position] && board[position].includes(currentPlayer)) {
        console.log("Piece selected:", board[position]);
        setSelectedPiece(position);
        updatePossibleMoves(position);
      }
    } catch (error) {
      console.error("Error handling tile click:", error);
    }
  };

  const updatePossibleMoves = (position) => {
    const piece = board[position];
    const fromRow = parseInt(position[0], 10);
    const fromCol = parseInt(position[1], 10);
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

      // Add castling moves
      if (
        isValidCastlingMove(
          fromRow,
          fromCol,
          fromRow,
          fromCol + 2,
          piece,
          board,
          hasMoved
        )
      ) {
        possibleMoves.push(fromRow + "" + (fromCol + 2));
      }
      if (
        isValidCastlingMove(
          fromRow,
          fromCol,
          fromRow,
          fromCol - 2,
          piece,
          board,
          hasMoved
        )
      ) {
        possibleMoves.push(fromRow + "" + (fromCol - 2));
      }
    } else if (piece.includes("pawn")) {
      possibleMoves = getPossiblePawnMoves(fromRow, fromCol, piece, board);
      if (enPassant) {
        possibleMoves.push(enPassant);
      }
    }

    possibleMoves = possibleMoves.filter(
      (move) => !board[move] || !board[move].includes(currentPlayer)
    );

    setPossibleMoves(possibleMoves);
  };

  const handleReset = () => {
    setBoard(initialBoardSetup);
    setSelectedPiece(null);
    setCurrentPlayer("white");
    setInCheck(false);
    setCheckMate(false);
    setPossibleMoves([]);
    setHasMoved({
      whiteKing: false,
      blackKing: false,
      whiteRookLeft: false,
      whiteRookRight: false,
      blackRookLeft: false,
      blackRookRight: false,
    });
    setEnPassant(null);
  };

  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const renderTiles = () => {
    let tiles = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
        const position = `${j}${i}`;
        const isBlack = (i + j) % 2 === 1;
        const isSelected = selectedPiece === position;
        const isPossibleMove = possibleMoves.includes(position);
        const isCaptureMove =
          isPossibleMove &&
          board[position] &&
          !board[position].includes(currentPlayer);

        tiles.push(
          <div
            key={position}
            className={`tile ${isBlack ? "white-tile" : "black-tile"} ${
              isSelected ? "highlighted-tile" : ""
            }`}
            onClick={() => handleTileClick(position)}
          >
            <div className="capture-overlay">
              {isPossibleMove && !isCaptureMove && <div className="circle" />}
              {isCaptureMove && <div className="capture-circle" />}
              {board[position] && <ChessPiece piece={board[position]} />}
            </div>
          </div>
        );
      }
    }
    return tiles;
  };

  return (
    <div className="chessboard-container">
      <div className="controls">
        <button onClick={handleReset} className="reset-button">
          Reset Game
        </button>
      </div>
      <div id="chessboard" className="grid grid-cols-8 w-800 h-800 mt-20">
        {renderTiles()}
      </div>
      {inCheck && !checkMate && (
        <div className="check-notification text-4xl">Check!</div>
      )}
      {checkMate && (
        <div className="checkmate-notification text-4xl">Checkmate!</div>
      )}
    </div>
  );
};

export default Chessboard;
