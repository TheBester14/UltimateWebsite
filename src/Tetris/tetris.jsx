import React, { useState, useEffect, useCallback } from "react";
import { TETROMINOS, getRandomTetromino } from "./Tetrominos";
import { createEmptyMatrix, isValidPosition, placeTetromino } from "./helper";

const Tetris = () => {
  const [matrix, setMatrix] = useState(createEmptyMatrix());
  const [stage, setStage] = useState(createEmptyMatrix());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [activeTetromino, setActiveTetromino] = useState(getRandomTetromino());
  const [isLanded, setIsLanded] = useState(false);

  const refreshMatrix = useCallback(
    (matrix) => {
      const newMatrix = createEmptyMatrix();
      stage.forEach((row, y) =>
        row.forEach((cell, x) => {
          newMatrix[y][x] = stage[y][x];
        })
      );
      const updatedMatrix = placeTetromino(
        newMatrix,
        activeTetromino,
        position.x,
        position.y
      );
      setMatrix(updatedMatrix);
    },
    [activeTetromino, position, stage]
  );

  const moveTetromino = (dirX, dirY) => {
    setPosition((prev) => {
      const newX = prev.x + dirX;
      const newY = prev.y + dirY;
      const isValid = isValidPosition(activeTetromino.shape, newX, newY, stage);
      console.log(`Trying to move to (${newX}, ${newY}):`, isValid);

      if (isValid) {
        return { x: newX, y: newY };
      } else if (dirY === 1) {
        // Tetromino has landed
        setIsLanded(true);
      }
      return prev;
    });
  };

  useEffect(() => {
    if (isLanded) {
      const landedMatrix = placeTetromino(
        stage,
        activeTetromino,
        position.x,
        position.y
      );
      setStage(landedMatrix);
      setActiveTetromino(getRandomTetromino());
      setPosition({ x: 3, y: 0 });
      setIsLanded(false);
    }
  }, [isLanded, activeTetromino, position.x, position.y, stage]);

  useEffect(() => {
    refreshMatrix();
  }, [position, activeTetromino, refreshMatrix]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      moveTetromino(-1, 0);
    } else if (e.key === "ArrowRight") {
      moveTetromino(1, 0);
    } else if (e.key === "ArrowDown") {
      moveTetromino(0, 1);
    } else if (e.key === "ArrowUp") {
      // rotateTetromino();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveTetromino(0, 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-44 w-screen h-screen">
      <div>
        {matrix.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{ display: "flex" }}
            className="justify-center"
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid black",
                  backgroundColor: cell.value ? cell.color : "white",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tetris;
