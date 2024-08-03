// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import "./Chessboard.css";
// // import initialBoardSetup from "./initialBoardSetup";
// // import io from "socket.io-client";
// // import ChessPiece from "./ChessPiece";
// // import { isMoveValid, isValidCastlingMove } from "./movementRules";
// // import {
// //   isKingInCheck,
// //   isCheckMate,
// //   getAllPossibleQueenMoves,
// //   getAllPossibleRookMoves,
// //   getAllPossibleBishopMoves,
// //   getAllPossibleKnightMoves,
// //   getPossiblePawnMoves,
// //   getAllPossibleKingMoves,
// // } from "./gamestate";

// // const socket = io("http://localhost:5000", { withCredentials: true });

// // const MultiplayerChess = ({ setGameMode }) => {
// //   const [board, setBoard] = useState(initialBoardSetup);
// //   const [selectedPiece, setSelectedPiece] = useState(null);
// //   const [currentPlayer, setCurrentPlayer] = useState("white");
// //   const [inCheck, setInCheck] = useState(false);
// //   const [checkMate, setCheckMate] = useState(false);
// //   const [possibleMoves, setPossibleMoves] = useState([]);
// //   const [hasMoved, setHasMoved] = useState({
// //     whiteKing: false,
// //     blackKing: false,
// //     whiteRookLeft: false,
// //     whiteRookRight: false,
// //     blackRookLeft: false,
// //     blackRookRight: false,
// //   });
// //   const [enPassant, setEnPassant] = useState(null);
// //   const [roomId, setRoomId] = useState("");
// //   const [playerColor, setPlayerColor] = useState("");
// //   const hasPromptedForRoomId = useRef(false);

// //   const handleOpponentMove = useCallback(
// //     ({ move, inCheck, checkMate, currentPlayer, enPassant, hasMoved }) => {
// //       const newBoard = { ...board };
// //       newBoard[move.to] = newBoard[move.from];
// //       newBoard[move.from] = null;

// //       // Handle en passant capture
// //       if (move.enPassantCapture) {
// //         const capturedPawnPosition = `${move.from[0]}${move.to[1]}`;
// //         newBoard[capturedPawnPosition] = null;
// //       }

// //       // Handle castling
// //       if (move.castling) {
// //         const rookFromCol = move.to[1] > move.from[1] ? 7 : 0;
// //         const rookToCol =
// //           move.to[1] > move.from[1] ? move.to[1] - 1 : move.to[1] + 1;
// //         const rookPosition = `${move.to[0]}${rookFromCol}`;
// //         const newRookPosition = `${move.to[0]}${rookToCol}`;
// //         newBoard[newRookPosition] = newBoard[rookPosition];
// //         newBoard[rookPosition] = null;
// //       }

// //       // Handle pawn promotion
// //       if (move.promotion) {
// //         newBoard[move.to] = currentPlayer + "queen";
// //       }

// //       setBoard(newBoard);
// //       setCurrentPlayer(currentPlayer);
// //       setInCheck(inCheck);
// //       setCheckMate(checkMate);
// //       setEnPassant(enPassant);
// //       setHasMoved(hasMoved);
// //     },
// //     [board]
// //   );

// //   useEffect(() => {
// //     if (!hasPromptedForRoomId.current) {
// //       hasPromptedForRoomId.current = true;
// //       const roomIdPrompt = prompt("Enter the room ID:");
// //       if (roomIdPrompt) {
// //         setRoomId(roomIdPrompt);
// //         socket.emit("join_game", roomIdPrompt, (color) => {
// //           setPlayerColor(color);
// //           setCurrentPlayer("white"); // Always start with white
// //         });
// //       } else {
// //         setGameMode(null); // Return to game mode selection if no room ID is entered
// //       }
// //     }

// //     socket.on("move_made", handleOpponentMove);

// //     return () => {
// //       socket.off("move_made");
// //     };
// //   }, [handleOpponentMove]);

// //   const handleTileClick = (position) => {
// //     if (currentPlayer !== playerColor) {
// //       return; // It's not this player's turn
// //     }
// //     if (selectedPiece) {
// //       if (board[position] && board[position].includes(currentPlayer)) {
// //         setSelectedPiece(position);
// //         updatePossibleMoves(position);
// //       } else if (
// //         isMoveValid(
// //           board[selectedPiece],
// //           selectedPiece,
// //           position,
// //           board,
// //           hasMoved,
// //           enPassant
// //         )
// //       ) {
// //         let newBoard = {
// //           ...board,
// //           [selectedPiece]: null,
// //           [position]: board[selectedPiece],
// //         };

// //         const toRow = parseInt(position[0], 10);
// //         const fromRow = parseInt(selectedPiece[0], 10);
// //         const fromCol = parseInt(selectedPiece[1], 10);
// //         const toCol = parseInt(position[1], 10);

// //         // Handle castling
// //         let castling = false;
// //         if (
// //           board[selectedPiece].includes("king") &&
// //           Math.abs(toCol - fromCol) === 2
// //         ) {
// //           castling = true;
// //           const rookFromCol = toCol > fromCol ? 7 : 0;
// //           const rookToCol = toCol > fromCol ? toCol - 1 : toCol + 1;
// //           newBoard[fromRow + "" + rookFromCol] = null;
// //           newBoard[fromRow + "" + rookToCol] = `${currentPlayer}rook${
// //             toCol > fromCol ? "right" : "left"
// //           }`;
// //           setHasMoved((prevState) => ({
// //             ...prevState,
// //             [`${currentPlayer}King`]: true,
// //             [`${currentPlayer}Rook${toCol > fromCol ? "Right" : "Left"}`]: true,
// //           }));
// //         }

// //         // Handle pawn promotion
// //         let promotion = false;
// //         if (currentPlayer === "white") {
// //           if (board[selectedPiece].includes("pawn") && toRow === 7) {
// //             newBoard[position] = "whitequeen";
// //             promotion = true;
// //           }
// //         } else if (currentPlayer === "black") {
// //           if (board[selectedPiece].includes("pawn") && toRow === 0) {
// //             newBoard[position] = "blackqueen";
// //             promotion = true;
// //           }
// //         }

// //         // Handle en passant
// //         let enPassantCapture = false;
// //         if (
// //           board[selectedPiece].includes("pawn") &&
// //           enPassant &&
// //           position === enPassant
// //         ) {
// //           newBoard[`${fromRow}${toCol}`] = null;
// //           enPassantCapture = true;
// //         }

// //         // Update en passant state
// //         let newEnPassant = null;
// //         if (
// //           board[selectedPiece].includes("pawn") &&
// //           Math.abs(toRow - fromRow) === 2
// //         ) {
// //           const leftPosition = `${toRow}${toCol - 1}`;
// //           const rightPosition = `${toRow}${toCol + 1}`;
// //           if (
// //             (board[leftPosition] &&
// //               board[leftPosition].includes(
// //                 currentPlayer === "white" ? "black" : "white"
// //               )) ||
// //             (board[rightPosition] &&
// //               board[rightPosition].includes(
// //                 currentPlayer === "white" ? "black" : "white"
// //               ))
// //           ) {
// //             newEnPassant = `${(fromRow + toRow) / 2}${fromCol}`;
// //           }
// //         }

// //         // Update the hasMoved state
// //         let newHasMoved = { ...hasMoved };
// //         if (board[selectedPiece].includes("king")) {
// //           newHasMoved[`${currentPlayer}King`] = true;
// //         } else if (board[selectedPiece].includes("rook")) {
// //           const rookSide = fromCol === 0 ? "Left" : "Right";
// //           newHasMoved[`${currentPlayer}Rook${rookSide}`] = true;
// //         }

// //         let kingPosition = Object.keys(board).find(
// //           (key) => board[key] === `${currentPlayer}king`
// //         );

// //         if (board[selectedPiece].includes("king")) {
// //           kingPosition = position;
// //         }

// //         if (isKingInCheck(currentPlayer, newBoard, kingPosition, enPassant)) {
// //           console.log("Move is invalid, it leaves the king in check");
// //         } else {
// //           const opponentColor = currentPlayer === "white" ? "black" : "white";
// //           let opponentKingPosition = Object.keys(newBoard).find(
// //             (key) => newBoard[key] === `${opponentColor}king`
// //           );
// //           const inCheck = isKingInCheck(
// //             opponentColor,
// //             newBoard,
// //             opponentKingPosition,
// //             newEnPassant
// //           );
// //           const checkMate = inCheck
// //             ? isCheckMate(opponentColor, newBoard, newEnPassant)
// //             : false;

// //           socket.emit("make_move", {
// //             roomId,
// //             move: {
// //               from: selectedPiece,
// //               to: position,
// //               enPassantCapture,
// //               castling,
// //               promotion,
// //             },
// //             inCheck,
// //             checkMate,
// //             currentPlayer: opponentColor,
// //             enPassant: newEnPassant,
// //             hasMoved: newHasMoved,
// //           });

// //           setBoard(newBoard);
// //           setPossibleMoves([]);
// //           setSelectedPiece(null);
// //           setCurrentPlayer(opponentColor);
// //           setInCheck(inCheck);
// //           setCheckMate(checkMate);
// //           setHasMoved(newHasMoved);
// //           setEnPassant(newEnPassant);
// //         }
// //       } else {
// //         setSelectedPiece(null);
// //         setPossibleMoves([]);
// //       }
// //     } else if (board[position] && board[position].includes(currentPlayer)) {
// //       setSelectedPiece(position);
// //       updatePossibleMoves(position);
// //     }
// //   };

// //   const updatePossibleMoves = (position) => {
// //     const piece = board[position];
// //     const fromRow = parseInt(position[0], 10);
// //     const fromCol = parseInt(position[1], 10);
// //     let possibleMoves = [];

// //     if (piece.includes("queen")) {
// //       possibleMoves = getAllPossibleQueenMoves(fromRow, fromCol, board);
// //     } else if (piece.includes("rook")) {
// //       possibleMoves = getAllPossibleRookMoves(fromRow, fromCol, board);
// //     } else if (piece.includes("bishop")) {
// //       possibleMoves = getAllPossibleBishopMoves(fromRow, fromCol, board);
// //     } else if (piece.includes("knight")) {
// //       possibleMoves = getAllPossibleKnightMoves(fromRow, fromCol, board);
// //     } else if (piece.includes("king")) {
// //       possibleMoves = getAllPossibleKingMoves(fromRow, fromCol, board);

// //       // Add castling moves
// //       if (
// //         isValidCastlingMove(
// //           fromRow,
// //           fromCol,
// //           fromRow,
// //           fromCol + 2,
// //           piece,
// //           board,
// //           hasMoved
// //         )
// //       ) {
// //         possibleMoves.push(fromRow + "" + (fromCol + 2));
// //       }
// //       if (
// //         isValidCastlingMove(
// //           fromRow,
// //           fromCol,
// //           fromRow,
// //           fromCol - 2,
// //           piece,
// //           board,
// //           hasMoved
// //         )
// //       ) {
// //         possibleMoves.push(fromRow + "" + (fromCol - 2));
// //       }
// //     } else if (piece.includes("pawn")) {
// //       possibleMoves = getPossiblePawnMoves(fromRow, fromCol, piece, board);
// //       if (enPassant) {
// //         possibleMoves.push(enPassant);
// //       }
// //     }

// //     possibleMoves = possibleMoves.filter(
// //       (move) => !board[move] || !board[move].includes(currentPlayer)
// //     );

// //     setPossibleMoves(possibleMoves);
// //   };

// //   const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
// //   const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

// //   const renderTiles = () => {
// //     let tiles = [];
// //     for (let j = verticalAxis.length - 1; j >= 0; j--) {
// //       for (let i = 0; i < horizontalAxis.length; i++) {
// //         const position = `${j}${i}`;
// //         const isBlack = (i + j) % 2 === 1;
// //         const isSelected = selectedPiece === position;
// //         const isPossibleMove = possibleMoves.includes(position);
// //         const isCaptureMove =
// //           isPossibleMove &&
// //           board[position] &&
// //           !board[position].includes(currentPlayer);

// //         tiles.push(
// //           <div
// //             key={position}
// //             className={`tile ${isBlack ? "white-tile" : "black-tile"} ${
// //               isSelected ? "highlighted-tile" : ""
// //             }`}
// //             onClick={() => handleTileClick(position)}
// //           >
// //             <div className="capture-overlay">
// //               {isPossibleMove && !isCaptureMove && <div className="circle" />}
// //               {isCaptureMove && <div className="capture-circle" />}
// //               {board[position] && <ChessPiece piece={board[position]} />}
// //             </div>
// //           </div>
// //         );
// //       }
// //     }
// //     return tiles;
// //   };

// //   const goBack = () => {
// //     setGameMode(null);
// //   };

// //   return (
// //     <div className="chessboard-container">
// //       <div className="controls">
// //         <button onClick={goBack} className="back-button">
// //           Return
// //         </button>
// //       </div>
// //       <div id="chessboard" className="grid grid-cols-8 w-800 h-800 mt-20">
// //         {renderTiles()}
// //       </div>
// //       {inCheck && !checkMate && (
// //         <div className="check-notification text-4xl">Check!</div>
// //       )}
// //       {checkMate && (
// //         <div className="checkmate-notification text-4xl">Checkmate!</div>
// //       )}
// //     </div>
// //   );
// // };

// export default MultiplayerChess;
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Chessboard.css";
import initialBoardSetup from "./initialBoardSetup";
import io from "socket.io-client";
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

const socket = io("http://localhost:5000", { withCredentials: true });

const MultiplayerChess = ({ setGameMode }) => {
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
  const [roomId, setRoomId] = useState("");
  const [playerColor, setPlayerColor] = useState("");
  const hasPromptedForRoomId = useRef(false);

  const handleOpponentMove = useCallback(
    ({ move, inCheck, checkMate, currentPlayer, enPassant, hasMoved }) => {
      const newBoard = { ...board };
      newBoard[move.to] = newBoard[move.from];
      newBoard[move.from] = null;

      // Handle en passant capture
      if (move.enPassantCapture) {
        const capturedPawnPosition = `${move.from[0]}${move.to[1]}`;
        newBoard[capturedPawnPosition] = null;
      }

      // Handle castling
      if (move.castling) {
        const rookFromCol = move.to[1] > move.from[1] ? 7 : 0;
        const rookToCol =
          move.to[1] > move.from[1] ? move.to[1] - 1 : move.to[1] + 1;
        const rookPosition = `${move.to[0]}${rookFromCol}`;
        const newRookPosition = `${move.to[0]}${rookToCol}`;
        newBoard[newRookPosition] = newBoard[rookPosition];
        newBoard[rookPosition] = null;
      }

      // Handle pawn promotion
      const previousPlayer = currentPlayer === "white" ? "black" : "white";
      if (move.promotion) {
        newBoard[move.to] = previousPlayer + "queen";
      }

      setBoard(newBoard);
      setCurrentPlayer(currentPlayer);
      setInCheck(inCheck);
      setCheckMate(checkMate);
      setEnPassant(enPassant);
      setHasMoved(hasMoved);
    },
    [board]
  );

  useEffect(() => {
    if (!hasPromptedForRoomId.current) {
      hasPromptedForRoomId.current = true;
      const roomIdPrompt = prompt("Enter the room ID:");
      if (roomIdPrompt) {
        setRoomId(roomIdPrompt);
        socket.emit("join_game", roomIdPrompt, (color) => {
          setPlayerColor(color);
          setCurrentPlayer("white"); // Always start with white
        });
      } else {
        setGameMode(null); // Return to game mode selection if no room ID is entered
      }
    }

    socket.on("move_made", handleOpponentMove);

    return () => {
      socket.off("move_made");
    };
  }, [handleOpponentMove]);

  const handleTileClick = (position) => {
    if (currentPlayer !== playerColor) {
      return; // It's not this player's turn
    }
    if (selectedPiece) {
      if (board[position] && board[position].includes(currentPlayer)) {
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

        // Handle castling
        let castling = false;
        if (
          board[selectedPiece].includes("king") &&
          Math.abs(toCol - fromCol) === 2
        ) {
          castling = true;
          const rookFromCol = toCol > fromCol ? 7 : 0;
          const rookToCol = toCol > fromCol ? toCol - 1 : toCol + 1;
          newBoard[fromRow + "" + rookFromCol] = null;
          newBoard[fromRow + "" + rookToCol] = `${currentPlayer}rook${
            toCol > fromCol ? "right" : "left"
          }`;
          setHasMoved((prevState) => ({
            ...prevState,
            [`${currentPlayer}King`]: true,
            [`${currentPlayer}Rook${toCol > fromCol ? "Right" : "Left"}`]: true,
          }));
        }

        // Handle pawn promotion
        let promotion = false;
        if (currentPlayer === "white") {
          if (board[selectedPiece].includes("pawn") && toRow === 7) {
            newBoard[position] = "whitequeen";
            promotion = true;
          }
        } else if (currentPlayer === "black") {
          if (board[selectedPiece].includes("pawn") && toRow === 0) {
            newBoard[position] = "blackqueen";
            promotion = true;
          }
        }

        // Handle en passant
        let enPassantCapture = false;
        if (
          board[selectedPiece].includes("pawn") &&
          enPassant &&
          position === enPassant
        ) {
          newBoard[`${fromRow}${toCol}`] = null;
          enPassantCapture = true;
        }

        // Update en passant state
        let newEnPassant = null;
        if (
          board[selectedPiece].includes("pawn") &&
          Math.abs(toRow - fromRow) === 2
        ) {
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
            newEnPassant = `${(fromRow + toRow) / 2}${fromCol}`;
          }
        }

        // Update the hasMoved state
        let newHasMoved = { ...hasMoved };
        if (board[selectedPiece].includes("king")) {
          newHasMoved[`${currentPlayer}King`] = true;
        } else if (board[selectedPiece].includes("rook")) {
          const rookSide = fromCol === 0 ? "Left" : "Right";
          newHasMoved[`${currentPlayer}Rook${rookSide}`] = true;
        }

        let kingPosition = Object.keys(board).find(
          (key) => board[key] === `${currentPlayer}king`
        );

        if (board[selectedPiece].includes("king")) {
          kingPosition = position;
        }

        if (isKingInCheck(currentPlayer, newBoard, kingPosition, enPassant)) {
          console.log("Move is invalid, it leaves the king in check");
        } else {
          const opponentColor = currentPlayer === "white" ? "black" : "white";
          let opponentKingPosition = Object.keys(newBoard).find(
            (key) => newBoard[key] === `${opponentColor}king`
          );
          const inCheck = isKingInCheck(
            opponentColor,
            newBoard,
            opponentKingPosition,
            newEnPassant
          );
          const checkMate = inCheck
            ? isCheckMate(opponentColor, newBoard, newEnPassant)
            : false;

          socket.emit("make_move", {
            roomId,
            move: {
              from: selectedPiece,
              to: position,
              enPassantCapture,
              castling,
              promotion,
            },
            inCheck,
            checkMate,
            currentPlayer: opponentColor,
            enPassant: newEnPassant,
            hasMoved: newHasMoved,
            board: newBoard,
          });

          setBoard(newBoard);
          setPossibleMoves([]);
          setSelectedPiece(null);
          setCurrentPlayer(opponentColor);
          setInCheck(inCheck);
          setCheckMate(checkMate);
          setHasMoved(newHasMoved);
          setEnPassant(newEnPassant);
        }
      } else {
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
    } else if (board[position] && board[position].includes(currentPlayer)) {
      setSelectedPiece(position);
      updatePossibleMoves(position);
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

  const goBack = () => {
    setGameMode(null);
  };

  return (
    <div className="chessboard-container">
      <div className="controls">
        <button onClick={goBack} className="back-button">
          Return
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

export default MultiplayerChess;
