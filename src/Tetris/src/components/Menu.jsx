import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import audioFile from "../asset/Gameboy Startup Sound.mp3";
import music from "../asset/Game Boy Tetris Music B.mp3";
import "./Menu.css";

const Menu = ({ startGame, startGameAi, setIsIndex }) => {
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
    setIsIndex(true);
  };

  const handleStartGame = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    startGame();
  };

  const handleStartGameAi = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    startGameAi();
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
          initial={{ transform: "translateY(-40vh)" }}
          animate={{ transform: "translateY(0vh)" }}
          transition={{ duration: 4 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div style={centerStyle}>
            <h1>Welcome to old-new Tetris! </h1>
            <br />
            <button
              class="button"
              style={{ zIndex: 1 }}
              onClick={handleStartGame}
            >
              Start Game
            </button>
            <br />
            <button class="button" style={{ zIndex: 1 }}>
              AI Input (one day)
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const centerStyle = {
  textAlign: "center",
};

export default Menu;
