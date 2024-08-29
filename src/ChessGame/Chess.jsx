// import React, { useState, useEffect } from "react";
// import FreeChessboard from "./Chessboard/FreeChessboard";
// import "./Chess.css";
// import SinglePlayerChessBoard from "./Chessboard/SinglePlayerChessBoard";
// import MultiplayerChess from "./Chessboard/MultiplayerChess";

// const Chess = () => {
//   const [gameMode, setGameMode] = useState(null);

//   const renderGameMode = () => {
//     switch (gameMode) {
//       case "freeplay":
//         return <FreeChessboard setGameMode={setGameMode} />;
//       case "multiplayer":
//         return <MultiplayerChess setGameMode={setGameMode} />;
//       case "singleplayer":
//         return <SinglePlayerChessBoard setGameMode={setGameMode} />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       id="app"
//       className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-5xl break-keep"
//     >
//       {gameMode === null ? (
//         <div className="text-center break-keep">
//           <h1 className="text-6xl mb-8 break-keep">Choose Your Game Mode</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => setGameMode("freeplay")}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Free Play
//             </button>
//             <button
//               onClick={() => setGameMode("singleplayer")}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               SinglePlayer
//             </button>
//             <button
//               onClick={() => setGameMode("multiplayer")}
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Multiplayer
//             </button>
//           </div>
//         </div>
//       ) : (
//         renderGameMode()
//       )}
//     </div>
//   );
// };

// export default Chess;
import React, { useState, useEffect } from "react";
import FreeChessboard from "./Chessboard/FreeChessboard";
import "./Chess.css";
import SinglePlayerChessBoard from "./Chessboard/SinglePlayerChessBoard";
import MultiplayerChess from "./Chessboard/MultiplayerChess";
import Gamelobby from "./Chessboard/Gamelobby";

const Chess = () => {
  const [gameMode, setGameMode] = useState(null);

  const renderGameMode = () => {
    switch (gameMode) {
      case "freeplay":
        return <FreeChessboard setGameMode={setGameMode} />;
      case "multiplayer":
        return <Gamelobby setGameMode={setGameMode} />;
      case "singleplayer":
        return <SinglePlayerChessBoard setGameMode={setGameMode} />;

      default:
        return null;
    }
  };

  return (
    <div
      id="app"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-5xl break-keep"
    >
      {gameMode === null ? (
        <div className="text-center break-keep">
          <h1 className="text-6xl mb-8 break-keep">Choose Your Game Mode</h1>
          <div className="space-x-4">
            <button
              onClick={() => setGameMode("freeplay")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Free Play
            </button>
            <button
              onClick={() => setGameMode("singleplayer")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              SinglePlayer
            </button>
            <button
              onClick={() => setGameMode("multiplayer")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Multiplayer
            </button>
          </div>
        </div>
      ) : (
        renderGameMode()
      )}
    </div>
  );
};

export default Chess;
