import React, { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 30, 100);
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <img
        src="https://media.discordapp.net/attachments/1252422429222113280/1260777613090357248/whipin.png?ex=66908e27&is=668f3ca7&hm=d8c07918f63f83a4b414fa923e12259180e3487ecc7bee1e0bee23f698160f2e&=&format=webp&quality=lossless&width=1202&height=676"
        className="arcade-img"
        alt=""
      />
      <div
        style={{ padding: "20px" }}
        className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12 justify-center"
      >
        <progress
          className="nes-progress is-primary"
          value={progress}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default Loader;
