import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About"; // Ensure the path is correct
import Games from "./components/Games";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { TimeSpentProvider } from "./components/TimeSpentContext";

function App() {
  return (
    <TimeSpentProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </TimeSpentProvider>
  );
}

export default App;
