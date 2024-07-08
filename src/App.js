import logo from "./logo.svg";
import { motion } from "framer-motion";

function App() {
  return (
    <div>
      <motion.div animate={{ x: 100 }} />
      <motion.h1
        className="text-red-300 text-8xl text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
        Hello this is a test
      </motion.h1>
    </div>
  );
}

export default App;
