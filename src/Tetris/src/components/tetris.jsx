import React, { useEffect, useCallback, useMemo } from "react";
import GameBoard from "./GameBoard";
import Menu from "./Menu";
import useTetrisGame from "../hooks/useTetrisGame";

const Tetris = () => {
  const {
    matrix,
    gameOver,
    inMenu,
    moveTetromino,
    rotateTetromino,
    startGame,
  } = useTetrisGame();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        moveTetromino(-1, 0);
      } else if (e.key === "ArrowRight") {
        moveTetromino(1, 0);
      } else if (e.key === "ArrowDown") {
        moveTetromino(0, 1);
      } else if (e.key === "ArrowUp") {
        rotateTetromino();
      }
    },
    [moveTetromino, rotateTetromino]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        <GameBoard matrixToRender={matrixToRender} />
      )}
    </div>
  );
};

export default Tetris;
