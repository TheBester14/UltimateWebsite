import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const TimeSpentContext = createContext();

export const TimeSpentProvider = ({ children }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);

      // Initialize time spent from backend
      const fetchTimeSpentUrl = `http://localhost:5000/get-time-spent/${decodedToken.id}`;
      console.log(`Fetching time spent from URL: ${fetchTimeSpentUrl}`); // Debugging

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
        })
        .catch((error) => console.error("Error fetching time spent:", error));

      // Start an interval to track time
      const intervalId = setInterval(() => {
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
      }, 60000); // Every 1 minute

      return () => clearInterval(intervalId); // Clean up
    }
  }, []);

  return (
    <TimeSpentContext.Provider value={{ timeSpent, username }}>
      {children}
    </TimeSpentContext.Provider>
  );
};
