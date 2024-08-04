const HighScorePreview = ({ highScore }) => {
  return (
    <div>
      <h1
        style={{
          color: "black",
          textAlign: "center",
          width: "200px",
          marginTop: "-285px",
        }}
      >
        High Score: {highScore}
      </h1>
    </div>
  );
};

export default HighScorePreview;
