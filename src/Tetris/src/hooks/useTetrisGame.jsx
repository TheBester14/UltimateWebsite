import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomTetromino } from "../utils/Tetrominos";
import {
  createEmptyMatrix,
  isValidPosition,
  placeTetromino,
  rotateMatrix,
  placeTetrominoAI,
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
  const savedTetrominoRef = useRef(null);
  const [isAIGameRunning, setIsAIGameRunning] = useState(false);
  const [moveQueue, setMoveQueue] = useState([]); // New move queue
  const [lastGravityTime, setLastGravityTime] = useState(Date.now());

  // New state for gravity level
  const [gravityLevel, setGravityLevel] = useState(0);

  // Gravity settings
  const gravitySpeed = Math.max(400, 1000 - gravityLevel * 300); // Minimum speed is 100ms

  useEffect(() => {
    activeTetrominoRef.current = activeTetromino;
  }, [activeTetromino]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const calculateHeightPenalty = (matrix) => {
    let totalHeightPenalty = 0;
    const maxY = matrix.length; // Hauteur totale du plateau

    for (let x = 0; x < matrix[0].length; x++) {
      // Parcourir chaque colonne
      for (let y = 0; y < maxY; y++) {
        // Parcourir chaque ligne de la colonne
        if (matrix[y][x] !== 0) {
          // Si une cellule contient un bloc (non zéro)
          totalHeightPenalty += maxY - y; // Ajouter la hauteur de cette colonne
          break; // Passer à la colonne suivante
        }
      }
    }

    return totalHeightPenalty;
  };

  const calculateHoles = (matrix) => {
    let holes = 0;
    for (let x = 0; x < matrix[0].length; x++) {
      let blockFound = false;
      for (let y = 0; y < matrix.length; y++) {
        if (matrix[y][x].value !== 0) {
          blockFound = true;
        } else if (blockFound && matrix[y][x].value === 0) {
          // On vérifie si les positions autour de cette case forment un trou
          const top = y > 0 ? matrix[y - 1][x].value : 1; // On considère un bloc en haut si on est au bord
          const bottom = y < matrix.length - 1 ? matrix[y + 1][x].value : 1; // Idem pour en bas
          const left = x > 0 ? matrix[y][x - 1].value : 1; // Idem pour la gauche
          const right = x < matrix[0].length - 1 ? matrix[y][x + 1].value : 1; // Idem pour la droite

          // On considère qu'il y a un trou si toutes les cases autour (gauche, droite, haut, bas) ne sont pas vides
          if (top !== 0 && bottom !== 0 && left !== 0 && right !== 0) {
            holes++;
          }
        }
      }
    }
    return holes;
  };

  const calculateBumpiness = (matrix) => {
    let bumpiness = 0;
    let heights = [];
    for (let x = 0; x < matrix[0].length; x++) {
      let height = 0;
      for (let y = 0; y < matrix.length; y++) {
        if (matrix[y][x].value !== 0) {
          height = matrix.length - y;
          break;
        }
      }
      heights.push(height);
    }

    for (let i = 0; i < heights.length - 1; i++) {
      bumpiness += Math.abs(heights[i] - heights[i + 1]);
    }

    return bumpiness;
  };

  const calculateRowClear = (matrix) => {
    let clearedLines = 0;
    matrix.forEach((row) => {
      if (row.slice(1, -1).every((cell) => cell.value !== 0)) {
        clearedLines++;
      }
    });
    return clearedLines * clearedLines; // Square the cleared lines for more reward
  };

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

  const executeMoves = useCallback((moves) => {
    setMoveQueue((prevQueue) => [...prevQueue, ...moves]);
  }, []);

  const evaluateFitness = useCallback((tempMatrix, x, y) => {
    let fitness = 0;

    // // Calculate fitness based on multiple heuristics
    const clearedLines = calculateRowClear(tempMatrix);
    console.log(clearedLines);
    const heightPenalty = calculateHeightPenalty(tempMatrix);
    console.log(heightPenalty);

    // const holePenalty = calculateHoles(tempMatrix);

    // Perform the fitness calculation
    fitness += clearedLines * 100; // Reward for clearing lines
    fitness -= heightPenalty * 400; // Penalty for higher stack
    // fitness -= holePenalty * 75; // Penalty for holes created

    // Check for NaN issues
    if (isNaN(fitness)) {
      return 0;
    }

    return fitness;
  }, []);

  const evaluateAllMoves = useCallback(() => {
    const generateAllEndPositions = (tetromino, stage) => {
      const possiblePositions = [];
      const width = 10;

      const dropTetromino = (shape, startX, startY) => {
        let y = startY;
        while (isValidPosition(shape, startX, y, stage)) {
          y++;
        }
        return y - 1; // Position finale valide avant l'invalidité
      };

      let rotatedTetromino = tetromino.shape;
      for (let rotation = 0; rotation < 4; rotation++) {
        rotatedTetromino = rotateMatrix(rotatedTetromino);
        for (let x = 1; x <= width; x++) {
          const finalY = dropTetromino(rotatedTetromino, x, 1);
          let tempStage = stage.map((row) => row.slice());

          tempStage = placeTetrominoAI(tempStage, rotatedTetromino, x, finalY);

          const score = evaluateFitness(tempStage, x, finalY);

          possiblePositions.push({
            x,
            y: finalY,
            rotation,
            shape: rotatedTetromino,
            score,
          });
        }
      }
      return possiblePositions;
    };

    const allPositions = generateAllEndPositions(
      activeTetrominoRef.current,
      stageRef.current
    );

    if (allPositions.length === 0) {
      return;
    }

    allPositions.sort((a, b) => b.score - a.score);

    const bestPosition = allPositions[0];

    if (bestPosition) {
      if (
        bestPosition &&
        bestPosition.x !== undefined &&
        bestPosition.y !== undefined
      ) {
        setPosition((prev) => {
          const NewPosition = { x: bestPosition.x, y: bestPosition.y };
          positionRef.current = NewPosition;
          return NewPosition;
        });
        refreshMatrix();
      }
    }
  }, [activeTetrominoRef, stageRef, evaluateFitness, refreshMatrix]);

  const rotateTetromino = useCallback(() => {
    const rotatedTetromino = rotateMatrix(activeTetrominoRef.current.shape);
    const currentX = position.x;
    const currentY = position.y;

    // Try rotating without moving
    if (
      isValidPosition(rotatedTetromino, currentX, currentY, stageRef.current)
    ) {
      setActiveTetromino((prev) => ({
        ...prev,
        shape: rotatedTetromino,
      }));
    } else {
      // Try shifting the Tetromino left or right to find a valid position
      const offsets = [-1, 1, -2, 2]; // Adjust values based on Tetromino width
      let foundValidPosition = false;

      for (let i = 0; i < offsets.length; i++) {
        const newX = currentX + offsets[i];
        if (
          isValidPosition(rotatedTetromino, newX, currentY, stageRef.current)
        ) {
          setActiveTetromino((prev) => ({
            ...prev,
            shape: rotatedTetromino,
          }));
          setPosition({ x: newX, y: currentY });
          foundValidPosition = true;
          break;
        }
      }

      if (!foundValidPosition) {
        // If no valid position is found, cancel the rotation.
      }
    }

    // Refresh the game matrix
    refreshMatrix();
  }, [position, activeTetrominoRef, stageRef, refreshMatrix]);

  const moveTetromino = useCallback(
    (dirX, dirY) => {
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
    },
    [setPosition, setIsLanded, activeTetrominoRef, stageRef, refreshMatrix]
  );

  const applyGravity = useCallback(() => {
    const now = Date.now();
    if (now - lastGravityTime >= gravitySpeed) {
      moveTetromino(0, 1); // Move down by one
      setLastGravityTime(now); // Update lastGravityTime
    } else {
    }
  }, [moveTetromino, lastGravityTime, gravitySpeed]);

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
  }, []);

  useEffect(() => {
    isLandedRef.current = isLanded;
  }, [isLanded]);

  useEffect(() => {
    let gravityInterval = setInterval(() => {
      if (isGameRunning || isAIGameRunning) {
        applyGravity();
      }
    }, 5); // Check gravity every 50ms or adjust as needed

    return () => clearInterval(gravityInterval);
  }, [isGameRunning, isAIGameRunning, applyGravity]);

  const checkAndClearLines = (matrix) => {
    const rowsToClear = [];

    matrix.forEach((row, rowIndex) => {
      if (row.slice(1, -1).every((cell) => cell.value !== 0)) {
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

      landedMatrix = checkAndClearLines(landedMatrix);

      setMatrix(landedMatrix);
      stageRef.current = landedMatrix;
      setCurrentScore((prev) => prev + 100);

      // Increase gravity level every 5000 points
      setGravityLevel(Math.floor(currentScore / 5000));

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
        setIsAIGameRunning(false); // Stop AI mode
      } else {
        setActiveTetromino(newTetromino);
        setPosition({ x: 3, y: 1 });
        setIsLanded(false);

        if (isAIGameRunning) {
          evaluateAllMoves();
        }
      }
    }
  }, [
    isLanded,
    activeTetromino,
    position,
    nextTetromino,
    refreshMatrix,
    isAIGameRunning, // Add isAIGameRunning to the dependency array
    evaluateAllMoves,
    currentScore, // Add currentScore to dependency array
  ]);

  useEffect(() => {
    refreshMatrix();
  }, [position, activeTetromino, refreshMatrix]);

  useEffect(() => {
    if (moveQueue.length > 0) {
      const move = moveQueue[0];

      // Execute one move
      if (move === "left") {
        moveTetromino(-1, 0);
      } else if (move === "right") {
        moveTetromino(1, 0);
      } else if (move === "rotate") {
        rotateTetromino();
      } else if (move === "drop") {
        dropTetrominoToBottom();
      }
    } else {
    }
  }, [
    moveQueue,
    moveTetromino,
    rotateTetromino,
    dropTetrominoToBottom,
    isAIGameRunning,
  ]);

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
      setIsAIGameRunning(false); // Ensure AI is not running in regular game mode
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
      setGravityLevel(0); // Reset gravity level
      refreshMatrix();
    },
    startAIGame() {
      setGameOver(false);
      setInMenu(false);
      setIsGameRunning(false); // Ensure regular game is not running in AI mode
      setIsAIGameRunning(true);
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
      setGravityLevel(0); // Reset gravity level for AI game
      refreshMatrix();
      // Generate all possible end positions and select the best one
      evaluateAllMoves();
    },
  };
};

export default useTetrisGame;
