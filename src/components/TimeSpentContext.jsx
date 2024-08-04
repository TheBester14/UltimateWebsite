import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

export const TimeSpentContext = createContext();

export const TimeSpentProvider = ({ children }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeSpentOnChess, setTimeSpentOnChess] = useState(0);
  const [timeSpentOnTetris, setTimeSpentOnTetris] = useState(0);
  const [username, setUsername] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Token from localStorage:", decodedToken.id); // Debugging
      setUsername(decodedToken.username);

      // Initialize time spent from backend
      const fetchTimeSpentUrl = `http://localhost:5000/get-time-spent/${decodedToken.id}`;

      fetch(fetchTimeSpentUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            `Fetched time spent for user ${decodedToken.id}: ${data.totalTimeSpent} minutes`
          ); // Debugging
          setTimeSpent(data.totalTimeSpent || 0);
          setTimeSpentOnChess(data.timeSpentOnChess || 0); // Set game-specific time
          setTimeSpentOnTetris(data.timeSpentOnTetris || 0); // Set game-specific time
        })
        .catch((error) => console.error("Error fetching time spent:", error));

      // Start an interval to track time
      const intervalId = setInterval(() => {
        const isChessPage = location.pathname === "/chess";
        const isTetrisPage = location.pathname === "/tetris";
        setTimeSpent((prevTime) => {
          const updatedTime = prevTime + 1;
          console.log(`Updating time spent: ${updatedTime}`); // Debugging

          const trackTimeUrl = "http://localhost:5000/track-time";
          console.log(`Tracking time at URL: ${trackTimeUrl}`); // Debugging

          fetch(trackTimeUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              timeSpent: 1,
              game: isChessPage ? "Chess" : isTetrisPage ? "Tetris" : null,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log("Time tracked successfully:", data.message); // Debugging
            })
            .catch((error) => console.error("Error tracking time:", error));
          return updatedTime;
        });

        if (isChessPage) {
          setTimeSpentOnChess((prevTime) => prevTime + 1); // Update game-specific time if on chess page
        }

        if (isTetrisPage) {
          setTimeSpentOnTetris((prevTime) => prevTime + 1); // Update game-specific time if on tetris page
        }
      }, 60000); // Every 1 minute

      return () => clearInterval(intervalId); // Clean up
    }
  }, [location]);

  return (
    <TimeSpentContext.Provider
      value={{ timeSpent, timeSpentOnChess, timeSpentOnTetris, username }}
    >
      {children}
    </TimeSpentContext.Provider>
  );
};
