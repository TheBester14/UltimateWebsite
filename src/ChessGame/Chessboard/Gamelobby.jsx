// import React, { useEffect } from "react";
// import { useState } from "react";
// import MultiplayerChess from "./MultiplayerChess";

// const Gamelobby = ({ setGameMode }) => {
//   const [choice, setChoice] = useState(null);
//   const [lobbies, setLobbies] = useState([]);
//   const [selectedLobby, setSelectedLobby] = useState(null);

//   useEffect(() => {
//     if (choice === "Join") {
//       fetchLobbies();
//     }
//   }, [choice]);

//   const fetchLobbies = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/fetch-lobbies", {
//         method: "GET",
//       });
//       const data = await response.json();
//       if (data.success) {
//         setLobbies(data.lobbies);
//         console.log("Lobbies fetched:", data.lobbies);
//       } else {
//         console.error("Failed to fetch lobbies");
//       }
//     } catch (err) {
//       console.error("Error fetching lobbies:", err);
//     }
//   };

//   const handleJoinLobby = (lobbyId) => {
//     setSelectedLobby(lobbyId);
//     setChoice("Join");
//   };

//   if (choice === "Host") {
//     return <MultiplayerChess />;
//   }

//   if (choice === "Join" && selectedLobby) {
//     return <MultiplayerChess lobbyId={selectedLobby} />;
//   }

//   console.log("Choice:", choice);
//   return (
//     <div className="flex flex-col items-center space-y-8">
//       {choice === null && (
//         <div className="flex flex-row space-x-20">
//           <button
//             className="nes-btn is-error text-xl p-4"
//             onClick={() => setChoice("Host")}
//           >
//             <span className="text-3xl">Host</span>
//           </button>
//           <button
//             className="nes-btn is-success text-xl p-4"
//             onClick={() => setChoice("Join")}
//           >
//             <span className="text-3xl">Join</span>
//           </button>
//         </div>
//       )}

//       {choice === "Join" && (
//         <div className="lobby-list space-y-4">
//           {lobbies.length > 0 ? (
//             lobbies.map((lobby) => (
//               <div
//                 key={lobby._id}
//                 className="flex justify-between p-4 border rounded"
//               >
//                 <span className="text-2xl">{lobby.name}</span>
//                 <button
//                   className="nes-btn is-primary"
//                   onClick={() => handleJoinLobby(lobby._id)}
//                 >
//                   Join
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No lobbies available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gamelobby;

import React, { useEffect, useState } from "react";
import MultiplayerChess from "./MultiplayerChess";

const Gamelobby = ({ setGameMode }) => {
  const [choice, setChoice] = useState(null);
  const [lobbies, setLobbies] = useState([]);
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (choice === "Join") {
      fetchLobbies();
    }
  }, [choice]);

  const fetchLobbies = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetch-lobbies", {
        method: "GET",
      });
      const data = await response.json();
      if (data.success) {
        setLobbies(data.lobbies);
        console.log("Lobbies fetched:", data.lobbies);
      } else {
        console.error("Failed to fetch lobbies");
      }
    } catch (err) {
      console.error("Error fetching lobbies:", err);
    }
  };

  const handleHostGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/create-lobby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ lobbyName: "New Lobby" }),
      });
      const data = await response.json();
      if (data.success) {
        setSelectedLobby(data.lobbyId);
        setChoice("Host");
      } else {
        console.error("Failed to create lobby");
      }
    } catch (err) {
      console.error("Error creating lobby:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinLobby = (lobbyId) => {
    setSelectedLobby(lobbyId);
    setChoice("Join");
  };

  if (choice === "Host" && selectedLobby) {
    return <MultiplayerChess lobbyId={selectedLobby} />;
  }

  if (choice === "Join" && selectedLobby) {
    return <MultiplayerChess lobbyId={selectedLobby} />;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {choice === null && (
        <div className="flex flex-row space-x-20">
          <button
            className="nes-btn is-error text-xl p-4"
            onClick={handleHostGame}
            disabled={isLoading}
          >
            <span className="text-3xl">Host</span>
          </button>
          <button
            className="nes-btn is-success text-xl p-4"
            onClick={() => setChoice("Join")}
          >
            <span className="text-3xl">Join</span>
          </button>
        </div>
      )}

      {choice === "Join" && (
        <div className="lobby-list space-y-4">
          {lobbies.length > 0 ? (
            lobbies.map((lobby) => (
              <div
                key={lobby._id}
                className="flex justify-between p-4 border rounded"
              >
                <span className="text-2xl">{lobby.name}</span>
                <button
                  className="nes-btn is-primary text-3xl"
                  onClick={() => handleJoinLobby(lobby._id)}
                >
                  Join
                </button>
              </div>
            ))
          ) : (
            <p>No lobbies available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Gamelobby;
