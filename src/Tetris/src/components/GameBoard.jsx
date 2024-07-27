import React from "react";

const GameBoard = ({ matrixToRender }) => {
  return <div className="tetris-board">{matrixToRender}</div>;
};

export default GameBoard;
