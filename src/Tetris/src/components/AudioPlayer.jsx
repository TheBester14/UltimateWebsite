import React, { useRef, useEffect } from "react";
import music from "../asset/Original Tetris theme Tetris Soundtrack.mp3";

const AudioPlayer = ({ score }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      if (score > 10000) {
        audioElement.playbackRate = 1.4;
      } else if (score > 5000) {
        audioElement.playbackRate = 1.2;
      } else if (score > 2000) {
        audioElement.playbackRate = 1;
      }
      audioElement.play();
    }
  }, [score]); // Adding score as a dependency

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
