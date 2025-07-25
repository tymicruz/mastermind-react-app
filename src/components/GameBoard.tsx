import React from "react";
import { Color } from "../logic/mastermind";

interface GameBoardProps {
  guesses: Color[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => (
  <div className="guess-board">
    {guesses.map((guess, i) => (
      <div
        key={i}
        className="guess-row"
        style={{ display: "flex", gap: "8px" }}
      >
        {guess.map((color, j) => (
          <div
            key={j}
            style={{
              width: 40,
              height: 40,
              border: "2px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: color || "#eee",
            }}
          >
            {color || ""}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default GameBoard;
