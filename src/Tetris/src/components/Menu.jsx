import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import audioFile from "../asset/Gameboy Startup Sound.mp3";
import music from "../asset/Game Boy Tetris Music B.mp3";
import "./Menu.css";

const Menu = ({ startGame }) => {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(audioFile);
  }, []);

  const handleAnimationComplete = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    audioRef.current = new Audio(music);
    audioRef.current.play();
  };

  const handleStartGame = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    startGame();
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasInteracted]);

  return (
    <div>
      {!hasInteracted ? (
        <div style={centerStyle} className="press">
          <h1> Press any button</h1>
        </div>
      ) : (
        <motion.div
          className="menu"
          style={menuStyle}
          initial={{ transform: "translateY(-100vh)" }}
          animate={{ transform: "translateY(0vh)" }}
          transition={{ duration: 4 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div style={centerStyle}>
            <h1>Welcome to old-new Tetris! </h1>
            <br />
            <button onClick={handleStartGame}>Start Game</button>
            <br />
            <button onClick={handleStartGame}>AI Input</button>
          </div>
        </motion.div>
      )}
    </div>
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
