import React, { useState } from "react";
import "./Home.css";

const images = [
  "http://www.bhmpics.com/wallpapers/little_pony_art-800x480.jpg",
  "https://preview.ibb.co/e5OShF/cropped_800_480_111290.jpg",
];

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
