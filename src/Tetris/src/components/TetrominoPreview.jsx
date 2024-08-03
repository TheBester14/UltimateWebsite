import React from "react";
import PropTypes from "prop-types";

const TetrominoPreview = ({ tetromino }) => {
  if (!tetromino) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(4, 30px)",
          gridTemplateColumns: "repeat(4, 30px)",
          border: "1px solid black",
          width: "120px",
          height: "120px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#888",
        }}
      ></div>
    );
  }

  const renderPreview = () => {
    const size = 4; // Assuming a 4x4 grid for preview
    const previewGrid = Array.from({ length: size }, () =>
      Array(size).fill(null)
    );

    // Calculate bounding box of the Tetromino
    let minX = size,
      minY = size,
      maxX = 0,
      maxY = 0;
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      });
    });

    const tetrominoWidth = maxX - minX + 1;
    const tetrominoHeight = maxY - minY + 1;

    const offsetX = Math.floor((size - tetrominoWidth) / 2) - minX;
    const offsetY = Math.floor((size - tetrominoHeight) / 2) - minY;

    return previewGrid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const tetrominoCell =
          rowIndex - offsetY >= 0 &&
          rowIndex - offsetY < tetromino.shape.length &&
          colIndex - offsetX >= 0 &&
          colIndex - offsetX < tetromino.shape[0].length
            ? tetromino.shape[rowIndex - offsetY][colIndex - offsetX]
            : 0;

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: "30px",
              height: "30px",
              backgroundImage: tetrominoCell
                ? `url(${tetromino.cellFormat})`
                : null,
              backgroundSize: "cover",
            }}
          />
        );
      })
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(4, 30px)",
        gridTemplateColumns: "repeat(4, 30px)",
        border: "1px solid black",
        width: "120px",
        height: "120px",
      }}
    >
      {renderPreview()}
    </div>
  );
};

TetrominoPreview.propTypes = {
  tetromino: PropTypes.shape({
    shape: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    cellFormat: PropTypes.string.isRequired, // Assuming each Tetromino has a cellFormat property for the image URL
  }),
};

export default TetrominoPreview;
