import React from "react";
import "./ChessPiece.css";
import images from "./images";
import { motion } from "framer-motion";

const ChessPiece = ({ piece, position }) => {
  return (
    <div className={`chess-piece ${piece}`}>
      <img src={images[piece]} alt={piece} />
    </div>
  );
};

export default ChessPiece;
