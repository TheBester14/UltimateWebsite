import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src="https://media.discordapp.net/attachments/1252422429222113280/1260777613090357248/whipin.png?ex=66908e27&is=668f3ca7&hm=d8c07918f63f83a4b414fa923e12259180e3487ecc7bee1e0bee23f698160f2e&=&format=webp&quality=lossless&width=1202&height=676"
        className="arcade-img w-full max-h-screen object-cover"
        alt=""
      />
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 absolute top-2/3  left-1/2 transform -translate-x-1/2 -translate-y-3/4 dark:text-white">
        <div className="flex flex-row">
          <motion.img
            src="https://media.discordapp.net/attachments/1252422429222113280/1262122455171072061/New_Piskel_12.png?ex=669572a2&is=66942122&hm=cefa05de588538691c16a680e76b7699c7919b3ed2e179d87080b0b9a636f159&=&format=webp&quality=lossless"
            className="object-scale-down sm:h-36 sm:w-36 rotate-90"
            animate={{ rotateY: [0, 360, 0] }}
            transition={{
              duration: 2, // Duration of rotation in seconds
              repeat: Infinity, // Repeat animation infinitely
              ease: "linear", // Linear animation
            }}
          />
          <motion.img
            src="https://media.discordapp.net/attachments/1252422429222113280/1262122455171072061/New_Piskel_12.png?ex=669572a2&is=66942122&hm=cefa05de588538691c16a680e76b7699c7919b3ed2e179d87080b0b9a636f159&=&format=webp&quality=lossless"
            className="object-scale-down sm:h-36 sm:w-36 rotate-90"
            animate={{ rotateY: [0, 360, 0] }}
            transition={{
              duration: 2, // Duration of rotation in seconds
              repeat: Infinity, // Repeat animation infinitely
              ease: "linear", // Linear animation
            }}
          />
          <motion.img
            src="https://media.discordapp.net/attachments/1252422429222113280/1262122455171072061/New_Piskel_12.png?ex=669572a2&is=66942122&hm=cefa05de588538691c16a680e76b7699c7919b3ed2e179d87080b0b9a636f159&=&format=webp&quality=lossless"
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
