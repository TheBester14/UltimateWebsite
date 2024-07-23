import React from "react";
import Chessboard from "./Chessboard/Chessboard";
import "./Chess.css";

const Chess = () => {
  return (
    //<div id="chess" className="min-h-screen flex justify-center items-center">
    <div id="app">
      <Chessboard />
    </div>
  );
};

export default Chess;
