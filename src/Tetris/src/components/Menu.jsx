import React from "react";
import { motion } from "framer-motion";

const Menu = ({ startGame }) => {
  return (
    <motion.div
      className="menu"
      style={menuStyle}
      initial={{ transform: "translateY(-100vh)" }}
      animate={{ transform: "translateY(0vh)" }}
      transition={{ duration: 4 }}
    >
      <div style={centerStyle}>
        <h1>Welcome to old-new Tetris! </h1>
        <br />
        <button onClick={startGame}>Start Game</button>
        <br />
        <button onClick={startGame}>ai input</button>
      </div>
    </motion.div>
  );
};

const menuStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh", // Full height of the viewport
  backgroundColor: "#9bbc0f",
};

const centerStyle = {
  textAlign: "center",
};

export default Menu;
