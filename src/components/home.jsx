import React, { useEffect } from "react";
import "./Home.css"; // Ensure the correct path to Home.css
import Piskel from "./New Piskel.png"; // Ensure the correct path to New Piskel.png

function Home() {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
        <link href="./Home.css" rel="stylesheet" />
      </head>
      <body>
        <div className="arcade-container">
          <img
            src="https://cdn.discordapp.com/attachments/1252422429222113280/1260025905292509356/whipin.png?ex=668dd211&is=668c8091&hm=cbf67206edbc7751a8d2ab4723df5a83b6e89b6276c7cfa6e41d682e865bff39&"
            className="arcade-img"
            alt=""
          />

          <div className="container-button">
            <ul>
              <li className="Games">Game 1</li>
              <li className="Games">Game 2</li>
              <li className="Games">Game 3</li>
              <li className="Games">Game 4</li>
            </ul>
          </div>
          <div className="Arrow" id="left">
            <button>
              <img
                src="https://cdn.discordapp.com/attachments/452310504233500673/1260063337660809236/New_Piskel_3.png?ex=668df4ee&is=668ca36e&hm=4f072744afce5325ce18ca4bfe35e9eb5fca207ebd976cf0b8f7705dba42040d&"
                alt=""
              />
            </button>
          </div>
          <div className="Arrow" id="right">
            <button>
              <img
                src="https://cdn.discordapp.com/attachments/452310504233500673/1260061452564434954/New_Piskel_2.png?ex=668df32d&is=668ca1ad&hm=38a56d11a8a10a5f269cb9ca4c368b4c49e2356e061169c792824848104f6395&"
                atl=""
              />
            </button>
          </div>
        </div>
      </body>
    </>
  );
}

export default Home;
