import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomTetromino } from "../utils/Tetrominos";
import {
  createEmptyMatrix,
  isValidPosition,
  placeTetromino,
  rotateMatrix,
} from "../utils/helper";
import stage from "../asset/Tetris stage.png";

const useTetrisGame = () => {
  const [position, setPosition] = useState({ x: 3, y: 1 });
  const positionRef = useRef(position);
  const [isLanded, setIsLanded] = useState(false);
  const [activeTetromino, setActiveTetromino] = useState(getRandomTetromino());
  const [nextTetromino, setNextTetromino] = useState(getRandomTetromino());
  const activeTetrominoRef = useRef(activeTetromino);
  const [matrix, setMatrix] = useState(createEmptyMatrix());
  const stageRef = useRef(createEmptyMatrix());
  const [gameOver, setGameOver] = useState(false);
  const [inMenu, setInMenu] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const isLandedRef = useRef(isLanded);
  const savedTetrominoRef = useRef(null); // Use ref for the saved tetromino
  const intervalRef = useRef(null); // Ref to store interval ID

  useEffect(() => {
    activeTetrominoRef.current = activeTetromino;
  }, [activeTetromino]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

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

    // Recréez la bordure après avoir placé le tétrimino
    const borderedMatrix = updatedMatrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (
          rowIndex === 0 ||
          rowIndex === updatedMatrix.length - 1 ||
          colIndex === 0 ||
          colIndex === row.length - 1
        ) {
          return { value: 1, cellFormat: stage };
        }
        return cell;
      })
    );

    setMatrix(borderedMatrix);
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
            const newPosition = { x: newX, y: newY };
            positionRef.current = newPosition;
            return newPosition;
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

  const saveTetromino = useCallback(() => {
    if (!savedTetrominoRef.current) {
      savedTetrominoRef.current = activeTetromino;
      setActiveTetromino(nextTetromino);
      setNextTetromino(getRandomTetromino());
      setPosition({ x: 4, y: 1 });
    } else {
      const tempTetromino = activeTetromino;
      setActiveTetromino(savedTetrominoRef.current);
      savedTetrominoRef.current = tempTetromino;
      setPosition({ x: 4, y: 1 });
    }
    refreshMatrix();
  }, [activeTetromino, nextTetromino, refreshMatrix]);

  const dropTetrominoToBottom = useCallback(() => {
    setPosition((prev) => {
      let newY = prev.y;
      const { shape } = activeTetrominoRef.current;
      const stage = stageRef.current;

      while (isValidPosition(shape, prev.x, newY + 1, stage)) {
        newY += 1;
      }
      const newPosition = { x: prev.x, y: newY };
      positionRef.current = newPosition;
      setIsLanded(true);
      return newPosition;
    });

    refreshMatrix();
  }, [refreshMatrix]);

  const previsualizeTetrominoAtBottom = useCallback(() => {
    let finalPosition = { ...positionRef.current };
    const { shape } = activeTetrominoRef.current;
    const stage = stageRef.current;

    while (
      isValidPosition(shape, finalPosition.x, finalPosition.y + 1, stage)
    ) {
      finalPosition.y += 1;
    }

    return finalPosition;
  }, [isValidPosition]);

  useEffect(() => {
    isLandedRef.current = isLanded;
  }, [isLanded]);

  useEffect(() => {
    let interval;

    if (isGameRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const speed =
        currentScore > 10000
          ? 200
          : currentScore > 5000
          ? 300
          : currentScore > 2000
          ? 500
          : 1000;

      interval = setInterval(() => {
        moveTetromino(0, 1);
      }, speed);

      intervalRef.current = interval;

      return () => clearInterval(interval);
    }
  }, [isGameRunning, moveTetromino, currentScore]);

  const checkAndClearLines = (matrix) => {
    const rowsToClear = [];

    matrix.forEach((row, rowIndex) => {
      if (
        row.slice(1, -1).every((cell) => cell.value !== 0) // Ignore first and last cells
      ) {
        rowsToClear.push(rowIndex);
      }
    });

    if (rowsToClear.length > 0) {
      if (rowsToClear.length === 4) {
        setCurrentScore((prev) => prev + 800);
      } else {
        setCurrentScore((prev) => prev + rowsToClear.length * 100);
      }
    }

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
      console.log(isLanded);

      landedMatrix = checkAndClearLines(landedMatrix);

      setMatrix(landedMatrix);
      stageRef.current = landedMatrix;
      setCurrentScore((prev) => prev + 100);

      const newTetromino = nextTetromino;
      setNextTetromino(getRandomTetromino());
      const isGameOver = !isValidPosition(
        newTetromino.shape,
        3,
        1,
        stageRef.current
      );

      if (isGameOver) {
        setGameOver(true);
        setInMenu(false);
        setIsGameRunning(false);
      } else {
        setActiveTetromino(newTetromino);
        setPosition({ x: 3, y: 1 });
        setIsLanded(false);
      }
    }
  }, [isLanded, activeTetromino, position, nextTetromino, refreshMatrix]);

  useEffect(() => {
    refreshMatrix();
  }, [position, activeTetromino, refreshMatrix]);

  return {
    matrix,
    nextTetromino,
    gameOver,
    inMenu,
    positionRef,
    activeTetrominoRef,
    stageRef,
    isLandedRef,
    moveTetromino,
    rotateTetromino,
    setPosition,
    setIsLanded,
    setActiveTetromino,
    currentScore,
    dropTetrominoToBottom,
    previsualizeTetrominoAtBottom,
    saveTetromino,
    savedTetrominoRef,
    setCurrentScore,
    startGame() {
      setGameOver(false);
      setInMenu(false);
      setIsGameRunning(true);
      setMatrix(createEmptyMatrix());
      stageRef.current = createEmptyMatrix();
      const initialTetromino = getRandomTetromino();
      setActiveTetromino(initialTetromino);
      setCurrentScore(0);
      savedTetrominoRef.current = null;
      setNextTetromino(getRandomTetromino());
      setPosition({ x: 3, y: 1 });
      setIsLanded(false);
      isLandedRef.current = false;
      refreshMatrix();
    },
  };
};

export default useTetrisGame;
