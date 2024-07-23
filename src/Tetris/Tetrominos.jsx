export const TETROMINOS = {
  // I: {
  //   shape: [
  //     [1, 1, 1, 1],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //   ],
  //   color: "cyan",
  //   type: "I",
  // },
  // J: {
  //   shape: [
  //     [1, 0, 0],
  //     [1, 1, 1],
  //     [0, 0, 0],
  //   ],
  //   color: "blue",
  //   type: "J",
  // },
  // L: {
  //   shape: [
  //     [1, 0, 0],
  //     [1, 0, 0],
  //     [1, 1, 0],
  //   ],
  //   color: "orange",
  //   type: "L",
  // },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
    type: "O",
  },
  // S: {
  //   shape: [
  //     [0, 1, 1],
  //     [1, 1, 0],
  //     [0, 0, 0],
  //   ],
  //   color: "green",
  //   type: "S",
  // },
  // T: {
  //   shape: [
  //     [0, 1, 0],
  //     [1, 1, 1],
  //     [0, 0, 0],
  //   ],
  //   color: "purple",
  //   type: "T",
  // },
  // Z: {
  //   shape: [
  //     [1, 1, 0],
  //     [0, 1, 1],
  //     [0, 0, 0],
  //   ],
  //   color: "red",
  //   type: "Z",
  // },
};

export const getRandomTetromino = () => {
  const tetrominoKeys = Object.keys(TETROMINOS);
  const randomKey =
    tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  return TETROMINOS[randomKey];
};
