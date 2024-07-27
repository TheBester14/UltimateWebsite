export const createEmptyMatrix = (width = 10, height = 20) => {
  return Array.from(Array(height), () =>
    Array(width).fill({ value: 0, cellFormat: null, color: "0,0,0" })
  );
};

export const isValidPosition = (shape, posX, posY, stage) => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        if (
          !stage[y + posY] ||
          !stage[y + posY][x + posX] ||
          stage[y + posY][x + posX].value !== 0
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
        newMatrix[y + posY][x + posX] = {
          value: tetromino.shape[y][x],
          cellFormat: tetromino.cellFormat,
        };
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
