import React, { useState } from "react";
import "./Games.css";
import leftArrowIMG from "./leftArrowIMG.png";
import rightArrowIMG from "./rightArrowIMG.png";
import tetrisIMG from "./tetrisIMG.png";
import ChessIMG from "./ChessIMG.png";

const images = [tetrisIMG, ChessIMG];

const name = ["Tetris", "Chess"];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <body>
        <div className="arcade-container">
          <img
            src="https://media.discordapp.net/attachments/1252422429222113280/1260777613090357248/whipin.png?ex=66908e27&is=668f3ca7&hm=d8c07918f63f83a4b414fa923e12259180e3487ecc7bee1e0bee23f698160f2e&=&format=webp&quality=lossless&width=1202&height=676"
            className="arcade-img"
            alt=""
          />
          <div className="slideshow-container">
            <div
              className="slides"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div className="slide" key={index}>
                  <img src={image} alt={`slide-${index}`} />
                  <h1 class="title">{name[index]}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="Arrow" id="left" onClick={prevSlide}>
            <button>
              <img src={leftArrowIMG} alt="Left Arrow" />
            </button>
          </div>
          <div className="Arrow" id="right" onClick={nextSlide}>
            <button>
              <img src={rightArrowIMG} alt="Right Arrow" />
            </button>
          </div>
        </div>
      </body>
    </>
  );
}

export default Home;
