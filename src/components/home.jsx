import React from "react";
import heartImg from "./heartImg.png";
const Home = () => {
  return (
    <div className="bg-white text-5xl min-h-screen flex flex-col items-center justify-center text-center ">
      <div className="flex space-x-2 mt-4">
        <img
          src={heartImg}
          alt="heart-img"
          className="object-scale-down h-36 w-36"
        />
        <img
          src={heartImg}
          alt="heart-img"
          className="object-scale-down h-36 w-36"
        />
        <img
          src={heartImg}
          alt="heart-img"
          className="object-scale-down h-36 w-36"
        />
      </div>
      <h1 className="mb-12">Welcome to UltimateWebsite</h1>
      <div className="text-2xl flex space-x-8">
        <button type="button" className="nes-btn is-success">
          Sign Up
        </button>
        <button type="button" className="nes-btn is-primary">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Home;
