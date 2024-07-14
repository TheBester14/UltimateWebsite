import React from "react";
import { useState, useEffect } from "react";
import heartImg from "./heartImg.png";
import { motion } from "framer-motion";
import Loader from "./Loader.jsx"; // Assurez-vous que le chemin est correct

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement de données
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Remplacez par la logique de chargement réelle

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen">
      <img
        src="https://media.discordapp.net/attachments/1252422429222113280/1260777613090357248/whipin.png?ex=66908e27&is=668f3ca7&hm=d8c07918f63f83a4b414fa923e12259180e3487ecc7bee1e0bee23f698160f2e&=&format=webp&quality=lossless&width=1202&height=676"
        className="arcade-img w-full h-auto"
        alt=""
      />

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
        <h1 className="mb-12 dark:text-white text-center w-screen lg:text-white">
          Welcome to UltimateWebsite
        </h1>
        <div className="text-2xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
          <button type="button" className="nes-btn is-success">
            Sign Up
          </button>
          <button type="button" className="nes-btn is-primary">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
