import React, { useState } from "react";
import axios from "axios";
import { useScroll } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Error: Could Not Register");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <div className="max-w-[280px] w-full flex flex-col items-center justify-center text-center">
        <h1 className="mb-5 text-4xl">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="text"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">
            Sign Up
          </button>
        </form>
        {message && <p className="mt-3 text-red-600">{message}</p>}
        <p className="text-center mt-3 text-[12px] whitespace-nowrap">
          Already have an account?
          <a href="https://www.google.ca/?hl=fr" className="text-gray-600 ml-3">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
