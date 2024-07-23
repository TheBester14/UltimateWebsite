import React from "react";
import "./ChessPiece.css";
import images from "./images";

const ChessPiece = ({ piece }) => {
  return (
    <div className={`chess-piece ${piece}`}>
      <img src={images[piece]} alt={piece} />
    </div>
  );
};

export default ChessPiece;
