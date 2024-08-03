import React, { useState, useEffect } from "react";
import heartImg from "./heartImg.png";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode"; // Correct import
import Loader from "./Loader.jsx"; // Ensure the path is correct
import { Link } from "react-router-dom";
import menubackground from "./menubackground.png";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with real loading logic

    // Check if user is logged in
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // Debugging
        if (decodedToken.username) {
          setUsername(decodedToken.username);
          setIsLoggedIn(true);
        } else {
          console.error("Username not found in token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen">
      <img src={menubackground} className="arcade-img w-full h-auto" alt="" />

      <div className="bg-1000 text-5xl flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex space-x-2">
          <motion.img
            src={heartImg}
            alt="heart-img"
            className="object-scale-down h-24 w-24 sm:h-36 sm:w-36"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.img
            src={heartImg}
            alt="heart-img"
            className="object-scale-down h-24 w-24 sm:h-36 sm:w-36"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.img
            src={heartImg}
            alt="heart-img"
            className="object-scale-down h-24 w-24 sm:h-36 sm:w-36"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        {isLoggedIn ? (
          <h1 className="mb-12 dark:text-white text-center w-screen lg:text-white">
            Welcome, {username}!
          </h1>
        ) : (
          <>
            <h1 className="mb-12 dark:text-white text-center w-screen lg:text-white">
              Welcome to UltimateWebsite
            </h1>
            <div className="text-2xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <Link to="/sign-up" className="nes-btn is-success">
                Sign Up
              </Link>
              <Link to="/login" className="nes-btn is-primary">
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
