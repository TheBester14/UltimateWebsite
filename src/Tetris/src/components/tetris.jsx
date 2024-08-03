import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import GameBoard from "./GameBoard";
import Menu from "./Menu";
import useTetrisGame from "../hooks/useTetrisGame";
import TetrominoPreview from "./TetrominoPreview";
import HighScorePreview from "./highscorepreview";
import AudioPlayer from "./AudioPlayer";

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
    dropTetrominoToBottom,
    previsualizeTetrominoAtBottom,
    activeTetrominoRef,
    saveTetromino,
    savedTetrominoRef,
  } = useTetrisGame();

  const [ghostPiecePosition, setGhostPiecePosition] = useState(
    previsualizeTetrominoAtBottom()
  );

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
              top: `${(ghostPiecePosition.y + rowIndex) * 30}px`,
              left: `${(ghostPiecePosition.x + colIndex) * 30}px`,
              width: "30px",
              height: "30px",
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
              border: "1px solid black",
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
      className="p-44 w-screen h-screen"
      style={{ backgroundColor: "#9bbc0f" }}
    >
      {inMenu ? (
        <Menu startGame={startGame} />
      ) : gameOver ? (
        <div style={{ textAlign: "center" }}>
          <h1>Game Over</h1>
          <button onClick={startGame}>Try Again</button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexDirection: "row-reverse",
          }}
        >
          <AudioPlayer score={currentScore} />
          <div style={{ position: "relative" }}>
            <GameBoard matrixToRender={matrixToRender} />
            {renderGhostPiece()}
          </div>
          <div style={{ position: "relative" }}>
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Next</h1>
            <TetrominoPreview tetromino={nextTetromino} />
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Saved</h1>
            <TetrominoPreview tetromino={savedTetrominoRef.current} />
          </div>
          <HighScorePreview highScore={currentScore} />
        </div>
      )}
    </div>
  );
};

export default Tetris;
