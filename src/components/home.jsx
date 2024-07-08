function Home() {
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      </header>

      <div className="arcade-container">
        <img src="../arcade_Layout.png" alt="" />
        <div className="btn-container">
          <button class="nes-btn">Button 1</button>
          <button class="nes-btn">Button 2</button>
          <button class="nes-btn">Button 3</button>
          <button class="nes-btn">Button 4</button>
        </div>
      </div>
    </>
  );
}
