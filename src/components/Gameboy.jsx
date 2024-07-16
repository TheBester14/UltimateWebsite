import React from "react";
import { color, motion } from "framer-motion";
import "./Gameboy.css";

const Gameboy = ({ text }) => {
  const splitText = (text) => {
    return text.split("").map((letter, index) => (
      <span key={index} className="animated-letter">
        {letter}
      </span>
    ));
  };
  return (
    <motion.div className="game" data-text={text}>
      {splitText(text)}
    </motion.div>
  );
};

export default Gameboy;
