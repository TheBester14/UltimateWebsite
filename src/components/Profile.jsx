import React, { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Gameboy from "./Gameboy";
import { TimeSpentContext } from "./TimeSpentContext";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [profilePic, setProfilePic] = useState("default-profile.jpg"); // default profile picture
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    timeSpent,
    timeSpentOnChess,
    timeSpentOnTetris,
    timeSpentOnSpaceInv,
    username: contextUsername,
  } = useContext(TimeSpentContext);

  const getMostPlayedGame = () => {
    if (
      timeSpentOnTetris > timeSpentOnChess &&
      timeSpentOnTetris > timeSpentOnSpaceInv
    ) {
      return "Tetris";
    } else if (timeSpentOnSpaceInv > timeSpentOnChess) {
      return "Space Invaders";
    }

    return "Chess";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log("Token from localStorage:", decodedToken); // Debugging
    axios
      .get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched users:", response.data); // Log the fetched data
        setUsers(response.data);
      })
      .catch((err) => console.log(err + " error"));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePic(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload-profile-pic", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent for authentication
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile picture updated successfully!");
      } else {
        alert("Error updating profile picture.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src="https://media.discordapp.net/attachments/1252422429222113280/1260777613090357248/whipin.png?ex=66908e27&is=668f3ca7&hm=d8c07918f63f83a4b414fa923e12259180e3487ecc7bee1e0bee23f698160f2e&=&format=webp&quality=lossless&width=1202&height=676"
        className="arcade-img w-full h-auto"
        alt=""
      />

      <div className="bg-1000 text-5xl flex flex-col items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 ">
        <h1 className="mb-12 dark:text-white lg:text-white text-center w-screen text-4xl mt-7 ">
          Here comes a new <Gameboy text="challenger!" />
        </h1>
        <div className="contains-all-object flex flex-col md:flex-row  w-7/12  items-center justify-center">
          <div className="flex flex-col items-center border-black-300  md:p-12 ">
            <b className="text-xl text-white w-max  ">
              Username: {contextUsername}
              <br /> Hours on the site:
              {Math.floor(timeSpent / 60)} h {timeSpent % 60} min
              <br /> Time Spent On Chess: {Math.floor(
                timeSpentOnChess / 60
              )} h {timeSpentOnChess % 60} min
              <br />
              Time Spent On Tetris: {Math.floor(timeSpentOnTetris / 60)} h{" "}
              {timeSpentOnTetris % 60} min
              <br />
              Time Spent On Space Invaders:{" "}
              {Math.floor(timeSpentOnSpaceInv / 60)} h{" "}
              {timeSpentOnSpaceInv % 60} min
              <br />
              Most Played Game: {getMostPlayedGame()}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
