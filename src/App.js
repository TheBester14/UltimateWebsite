import logo from "./logo.svg";
import { motion } from "framer-motion";
import Home from "./components/Home.jsx"; // Make sure the path is correct
import Navbar from "./components/Navbar.jsx"; // Make sure the path is correct

// ceci est un commentaire
function App() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
