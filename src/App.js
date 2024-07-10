import logo from "./logo.svg";
import { motion } from "framer-motion";
import Home from "./components/Home.jsx"; // Make sure the path is correct
import Navbar from "./components/Navbar.jsx"; // Make sure the path is correct

// ceci est un commentaire
function App() {
  return (
    <>
      <Navbar />
      <header>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      </header>
      <body>
        <Home />
      </body>
    </>
  );
}

export default App;
