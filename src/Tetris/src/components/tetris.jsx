import React, { useEffect, useCallback, useMemo, useState } from "react";
import GameBoard from "./GameBoard";
import Menu from "./Menu";
import useTetrisGame from "../hooks/useTetrisGame";
import TetrominoPreview from "./TetrominoPreview";
import HighScorePreview from "./highscorepreview";
import AudioPlayer from "./AudioPlayer";
import gameboyImage from "../asset/R.png";
import "./tetris.css";

const Tetris = () => {
  const {
    matrix,
    gameOver,
    inMenu,
    nextTetromino,
    moveTetromino,
    currentScore,
    rotateTetromino,
    startGame,
    startAIGame,
    dropTetrominoToBottom,
    previsualizeTetrominoAtBottom,
    activeTetrominoRef,
    saveTetromino,
    savedTetrominoRef,
  } = useTetrisGame();

  const [ghostPiecePosition, setGhostPiecePosition] = useState(
    previsualizeTetrominoAtBottom()
  );
  const [isIndex, setIsIndex] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        moveTetromino(-1, 0);
        setGhostPiecePosition(previsualizeTetrominoAtBottom());
      } else if (e.key === "ArrowRight") {
        moveTetromino(1, 0);
        setGhostPiecePosition(previsualizeTetrominoAtBottom());
      } else if (e.key === "ArrowDown") {
        moveTetromino(0, 1);
        setGhostPiecePosition(previsualizeTetrominoAtBottom());
      } else if (e.key === "ArrowUp") {
        rotateTetromino();
        setGhostPiecePosition(previsualizeTetrominoAtBottom());
      } else if (e.key === " ") {
        dropTetrominoToBottom();
      } else if (e.key === "Enter") {
        saveTetromino();
      }
    },
    [
      moveTetromino,
      rotateTetromino,
      dropTetrominoToBottom,
      previsualizeTetrominoAtBottom,
      saveTetromino,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setGhostPiecePosition(previsualizeTetrominoAtBottom());
  }, [
    matrix,
    activeTetrominoRef.current.shape,
    activeTetrominoRef.current.position,
  ]);

  const renderGhostPiece = () => {
    const { shape } = activeTetrominoRef.current;

    return shape.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        cell ? (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              position: "absolute",
              top: `${(ghostPiecePosition.y + rowIndex) * 30 + 22}px`,
              left: `${(ghostPiecePosition.x + colIndex) * 30 + 200}px`,
              width: "30px",
              height: "30px",
              border: "1px solid rgba(0, 0, 0, 0.8)", // Ajout d'une bordure pour une meilleure visibilité

              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></div>
        ) : null
      )
    );
  };

  const matrixToRender = useMemo(() => {
    return matrix.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={{ display: "flex" }}
        className="matrix justify-center"
      >
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            style={{
              width: "30px",
              height: "30px",
              backgroundImage: cell.value ? `url(${cell.cellFormat})` : null,
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    ));
  }, [matrix]);

  return (
    <div
      className="relative h-screen w-screen"
      style={{ backgroundColor: "#9bbc0f" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: isIndex ? 0 : 2 }}
      >
        <img src={gameboyImage} className="gameboy h-full w-full" alt="" />
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <div className="menu text-xl flex flex-col items-center">
          {inMenu ? (
            <Menu
              startGame={startGame}
              startGameAi={startAIGame}
              setIsIndex={setIsIndex}
            />
          ) : gameOver ? (
            <div style={{ textAlign: "center" }}>
              <h1>Game Over</h1>
              <br />

              <button onClick={startGame}>one player mod</button>
              <br />

              <button>Ai mod (one day)</button>
            </div>
          ) : (
            <div
              className="tetris h-full"
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
                flexDirection: "row-reverse",
              }}
            >
              <AudioPlayer score={currentScore} />
              <div style={{ marginTop: "22px" }}>
                <GameBoard matrixToRender={matrixToRender} />
                {renderGhostPiece()}
              </div>
              <div style={{ position: "relative", alignItems: "center" }}>
                <h1 style={{ fontSize: "2rem" }}>Next</h1>
                <TetrominoPreview tetromino={nextTetromino} />
                <h1 style={{ fontSize: "2rem", marginLeft: "-12%" }}>Saved</h1>
                <TetrominoPreview tetromino={savedTetrominoRef.current} />
                <br />
                <h1>
                  Score : <br />
                  {currentScore}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tetris;
