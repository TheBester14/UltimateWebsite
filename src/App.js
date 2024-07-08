import logo from "./logo.svg";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      </header>
      <body>
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
      </body>
    </>
  );
}

export default App;
