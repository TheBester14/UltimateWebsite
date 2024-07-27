import block from "../asset/block.png";
import block2 from "../asset/block 2.png";
import blockfull from "../asset/block full.png";

export const TETROMINOS = {
  I: {
    shape: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    cellFormat: block,
    type: "I",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    cellFormat: block2,
    type: "J",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    cellFormat: block2,
    type: "L",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    cellFormat: blockfull,
    type: "O",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    cellFormat: blockfull,
    type: "S",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    cellFormat: block2,
    type: "T",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    cellFormat: block,
    type: "Z",
  },
};

export const getRandomTetromino = () => {
  const tetrominoKeys = Object.keys(TETROMINOS);
  const randomKey =
    tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  return TETROMINOS[randomKey];
};
