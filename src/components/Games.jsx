// import React, { useState } from "react";
// import "./Games.css";
// import leftArrowIMG from "./leftArrowIMG.png";
// import rightArrowIMG from "./rightArrowIMG.png";
// import tetrisIMG from "./tetrisIMG.png";
// import ChessIMG from "./ChessIMG.png";
// import menubackground from "./menubackground.png";

// const images = [tetrisIMG, ChessIMG];

// const name = ["Tetris", "Chess"];
// const urls = ["http://localhost:3000/tetris", "http://localhost:3000/chess"];

// function Home() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     const newIndex = (currentIndex - 1 + images.length) % images.length;
//     setCurrentIndex(newIndex);
//   };

//   const nextSlide = () => {
//     const newIndex = (currentIndex + 1) % images.length;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <>
//       <body>
//         <div className="arcade-container">
//           <img src={menubackground} className="arcade-img" alt="" />
//           <div className="slideshow-container">
//             <div
//               className="slides"
//               style={{ transform: `translateX(${-currentIndex * 100}%)` }}
//             >
//               {images.map((image, index) => (
//                 <div className="slide" key={index}>
//                   <a href={urls[index]} key={index}>
//                     <img src={image} alt={`slide-${index}`} />
//                     <h1 class="title">{name[index]}</h1>
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="Arrow" id="left" onClick={prevSlide}>
//             <button>
//               <img src={leftArrowIMG} alt="Left Arrow" />
//             </button>
//           </div>
//           <div className="Arrow" id="right" onClick={nextSlide}>
//             <button>
//               <img src={rightArrowIMG} alt="Right Arrow" />
//             </button>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// }

// export default Home;
import React, { useState } from "react";
import "./Games.css";
import leftArrowIMG from "./leftArrowIMG.png";
import rightArrowIMG from "./rightArrowIMG.png";
import tetrisIMG from "./tetrisIMG.png";
import ChessIMG from "./ChessIMG.png";
import menubackground from "./menubackground.png";

const images = [tetrisIMG, ChessIMG];
const name = ["Tetris", "Chess"];
const urls = ["http://localhost:3000/tetris", "http://localhost:3000/chess"];

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
    <div className="arcade-container">
      <img src={menubackground} className="arcade-img" alt="" />
      <div className="slideshow-container">
        <div
          className="slides"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <a href={urls[index]} key={index}>
                <img src={image} alt={`slide-${index}`} />
                <h1 className="title">{name[index]}</h1>
              </a>
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
  );
}

export default Home;
