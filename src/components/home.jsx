import React, { useState } from "react";
import "./Home.css";

const images = [
  "https://cdn.discordapp.com/attachments/1252422429222113280/1260766818432450570/New_Piskel_4.png?ex=66908419&is=668f3299&hm=e593a62866abce49d378edbbb63f8df31a7e99208927aa5ad55a539d9ba5c307&",
  "https://cdn.discordapp.com/attachments/1252422429222113280/1260801561580539904/New_Piskel_9.png?ex=6690a474&is=668f52f4&hm=b0f3ed18aaec58fea4f6add1e1427fa66f40ab888e28888435061f61b8da690e&",
];

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
              <img
                src="https://cdn.discordapp.com/attachments/452310504233500673/1260063337660809236/New_Piskel_3.png?ex=668df4ee&is=668ca36e&hm=4f072744afce5325ce18ca4bfe35e9eb5fca207ebd976cf0b8f7705dba42040d&"
                alt="Left Arrow"
              />
            </button>
          </div>
          <div className="Arrow" id="right" onClick={nextSlide}>
            <button>
              <img
                src="https://cdn.discordapp.com/attachments/452310504233500673/1260061452564434954/New_Piskel_2.png?ex=668df32d&is=668ca1ad&hm=38a56d11a8a10a5f269cb9ca4c368b4c49e2356e061169c792824848104f6395&"
                alt="Right Arrow"
              />
            </button>
          </div>
        </div>
      </body>
    </>
  );
}

export default Home;
