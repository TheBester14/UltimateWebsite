import stage from "../asset/Tetris stage.png";
export const createEmptyMatrix = (width = 12, height = 22) => {
  return Array.from({ length: height }, (_, rowIndex) =>
    Array.from({ length: width }, (_, colIndex) => {
      return { value: 0, cellFormat: null, color: "0,0,0" }; // Regular cells
    })
  );
};

export const isValidPosition = (shape, posX, posY, stage) => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newY = y + posY;
        const newX = x + posX;
        if (
          newY < 1 || // Check top border
          newY >= stage.length - 1 || // Check bottom border
          newX < 1 || // Check left border
          newX >= stage[newY].length - 1 || // Check right border
          stage[newY][newX].value !== 0 // Check if cell is occupied
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placeTetromino = (matrix, tetromino, posX, posY) => {
  const newMatrix = matrix.map((row) => row.map((cell) => ({ ...cell })));
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newY = y + posY;
        const newX = x + posX;
        if (
          newY > 0 && // Ne pas écraser la première ligne de la bordure
          newY < newMatrix.length - 1 && // Ne pas écraser la dernière ligne de la bordure
          newX > 0 && // Ne pas écraser la première colonne de la bordure
          newX < newMatrix[newY].length - 1 && // Ne pas écraser la dernière colonne de la bordure
          newMatrix[newY][newX].value === 0
        ) {
          newMatrix[newY][newX] = {
            value: tetromino.shape[y][x],
            cellFormat: tetromino.cellFormat,
          };
        }
      }
    }
  }
  return newMatrix;
};

export const rotateMatrix = (matrix) => {
  const rotatedMatrix = matrix.map((_, index) =>
    matrix.map((column) => column[index])
  );
  return rotatedMatrix.map((row) => row.reverse());
};
