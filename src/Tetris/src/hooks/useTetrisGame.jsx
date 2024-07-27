import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomTetromino } from "../utils/Tetrominos";
import {
  createEmptyMatrix,
  isValidPosition,
  placeTetromino,
  rotateMatrix,
} from "../utils/helper";

const useTetrisGame = () => {
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [isLanded, setIsLanded] = useState(false);
  const [activeTetromino, setActiveTetromino] = useState(getRandomTetromino());
  const activeTetrominoRef = useRef(activeTetromino);
  const [matrix, setMatrix] = useState(createEmptyMatrix());
  const stageRef = useRef(createEmptyMatrix());
  const [gameOver, setGameOver] = useState(false);
  const [inMenu, setInMenu] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    activeTetrominoRef.current = activeTetromino;
  }, [activeTetromino]);

  const refreshMatrix = useCallback(() => {
    const newMatrix = stageRef.current.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const updatedMatrix = placeTetromino(
      newMatrix,
      activeTetrominoRef.current,
      position.x,
      position.y
    );
    setMatrix(updatedMatrix);
  }, [position]);

  const rotateTetromino = useCallback(() => {
    const rotatedTetromino = rotateMatrix(activeTetrominoRef.current.shape);
    const isValid = isValidPosition(
      rotatedTetromino,
      position.x,
      position.y,
      stageRef.current
    );

    if (isValid) {
      setActiveTetromino((prev) => ({
        ...prev,
        shape: rotatedTetromino,
      }));
    } else {
      let offsetX = 0;
      let valid = false;

      while (!valid && offsetX < rotatedTetromino[0].length) {
        if (
          isValidPosition(
            rotatedTetromino,
            position.x + offsetX,
            position.y,
            stageRef.current
          )
        ) {
          setActiveTetromino((prev) => ({
            ...prev,
            shape: rotatedTetromino,
          }));
          setPosition((prev) => ({ x: prev.x + offsetX, y: prev.y }));
          refreshMatrix();
          valid = true;
        } else if (
          isValidPosition(
            rotatedTetromino,
            position.x - offsetX,
            position.y,
            stageRef.current
          )
        ) {
          setActiveTetromino((prev) => ({
            ...prev,
            shape: rotatedTetromino,
          }));
          setPosition((prev) => ({ x: prev.x - offsetX, y: prev.y }));
          refreshMatrix();
          valid = true;
        }
        offsetX++;
      }
    }
    refreshMatrix();
  }, [position, activeTetrominoRef, stageRef, refreshMatrix]);

  const moveTetromino = useCallback(
    (dirX, dirY) => {
      if (isGameRunning) {
        setPosition((prev) => {
          const newX = prev.x + dirX;
          const newY = prev.y + dirY;
          const isValid = isValidPosition(
            activeTetrominoRef.current.shape,
            newX,
            newY,
            stageRef.current
          );

          if (isValid) {
            return { x: newX, y: newY };
          } else if (dirY === 1) {
            setIsLanded(true);
          }
          return prev;
        });
        refreshMatrix();
      }
    },
    [
      isGameRunning,
      setPosition,
      setIsLanded,
      activeTetrominoRef,
      stageRef,
      refreshMatrix,
    ]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameRunning) {
        moveTetromino(0, 1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isGameRunning, moveTetromino]);

  const checkAndClearLines = (matrix) => {
    const rowsToClear = [];

    matrix.forEach((row, rowIndex) => {
      if (row.every((cell) => cell.value !== 0)) {
        rowsToClear.push(rowIndex);
      }
    });

    if (rowsToClear.length > 0) {
      let newMatrix = matrix.filter(
        (row, rowIndex) => !rowsToClear.includes(rowIndex)
      );
      const emptyRows = createEmptyMatrix().slice(0, rowsToClear.length);
      newMatrix = emptyRows.concat(newMatrix);
      return newMatrix;
    }

    return matrix;
  };

  useEffect(() => {
    if (isLanded) {
      let landedMatrix = placeTetromino(
        stageRef.current,
        activeTetrominoRef.current,
        position.x,
        position.y
      );

      landedMatrix = checkAndClearLines(landedMatrix);

      stageRef.current = landedMatrix;

      const newTetromino = getRandomTetromino();
      const isGameOver = !isValidPosition(
        newTetromino.shape,
        3,
        0,
        stageRef.current
      );

      if (isGameOver) {
        setGameOver(true);
        setInMenu(false);
        setIsGameRunning(false);
      } else {
        setActiveTetromino(newTetromino);
        setPosition({ x: 3, y: 0 });
        setIsLanded(false);
      }
    }
  }, [isLanded, activeTetromino, position]);

  useEffect(() => {
    refreshMatrix();
  }, [position, activeTetromino, refreshMatrix]);

  return {
    matrix,
    gameOver,
    inMenu,
    moveTetromino,
    rotateTetromino,
    setPosition,
    setIsLanded,
    setActiveTetromino,
    startGame: () => {
      setGameOver(false);
      setInMenu(false);
      setIsGameRunning(true);
      setMatrix(createEmptyMatrix());
      stageRef.current = createEmptyMatrix();
      setActiveTetromino(getRandomTetromino());
      setPosition({ x: 4, y: 0 });
      setIsLanded(false);
    },
  };
};

export default useTetrisGame;
