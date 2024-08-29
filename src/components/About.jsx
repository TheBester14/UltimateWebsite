import React from "react";
import { motion } from "framer-motion";
import menuBackground from "./menubackground.png";
import coins from "./coins.webp";

const About = () => {
  return (
    <div className="relative min-h-screen">
      <img src={menuBackground} className="arcade-img w-full h-auto" alt="" />
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 absolute top-2/3  left-1/2 transform -translate-x-1/2 -translate-y-3/4 dark:text-white">
        <div className="flex flex-row">
          <motion.img
            src={coins}
            className="object-scale-down sm:h-36 sm:w-36 rotate-90"
            animate={{ rotateY: [0, 360, 0] }}
            transition={{
              duration: 2, // Duration of rotation in seconds
              repeat: Infinity, // Repeat animation infinitely
              ease: "linear", // Linear animation
            }}
          />
          <motion.img
            src={coins}
            className="object-scale-down sm:h-36 sm:w-36 rotate-90"
            animate={{ rotateY: [0, 360, 0] }}
            transition={{
              duration: 2, // Duration of rotation in seconds
              repeat: Infinity, // Repeat animation infinitely
              ease: "linear", // Linear animation
            }}
          />
          <motion.img
            src={coins}
            className="object-scale-down sm:h-36 sm:w-36 rotate-90"
            animate={{ rotateY: [0, 360, 0] }}
            transition={{
              duration: 2, // Duration of rotation in seconds
              repeat: Infinity, // Repeat animation infinitely
              ease: "linear", // Linear animation
            }}
          />
        </div>
        <h1 className="font-semibold text-white">About Us</h1>
        <p className="w-screen lg:text-white">
          The ultimate website is a project developed by 3 first-year students.
          <br />
          The project has the goal to develop our skills as developers. Since we
          <br />
          are incorporating many systems which are new to us, the name "Ultimate
          <br />
          Website" was the most fitting.
        </p>
      </div>
    </div>
  );
};

export default About;
