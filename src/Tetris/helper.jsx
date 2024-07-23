export const createEmptyMatrix = () => {
  const rows = 20;
  const cols = 10;
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 0, color: "white" }))
  );
};

export const isValidPosition = (shape, posX, posY, matrix) => {
  if (!shape) return false;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newX = posX + x;
        const newY = posY + y;

        console.log(matrix[0].length);
        console.log(newX);
        // Check if new position is out of the left or right boundaries
        if (newX < 0 || newX > 9) {
          return false;
        }

        // Check if new position is out of the top or bottom boundaries
        if (newY >= matrix.length) {
          return false;
        }

        // Check if the cell is occupied by another tetromino
        if (newY >= 0 && matrix[newY][newX].value !== 0) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placeTetromino = (matrix, { shape, color }, posX, posY) => {
  const newMatrix = matrix.map((row) => row.map((cell) => ({ ...cell })));

  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const newY = posY + y;
        const newX = posX + x;
        if (
          newY >= 0 &&
          newY < newMatrix.length &&
          newX >= 0 &&
          newX < newMatrix[0].length
        ) {
          newMatrix[newY][newX] = { value, color };
        }
      }
    });
  });
  return newMatrix;
};
