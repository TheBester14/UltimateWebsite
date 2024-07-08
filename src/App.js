import logo from "./logo.svg";
import { motion } from "framer-motion";

function App() {
  return (
    <div>
      <motion.div animate={{ x: 100 }} />
      <motion.h1
        className="text-red-300 text-8xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }} // Adjust the duration as needed
      >
        Hello this is a test
      </motion.h1>
    </div>
  );
}

export default App;
