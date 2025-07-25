import React from "react";
import { Color } from "../logic/mastermind";

interface GameBoardProps {
  guesses: Color[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => (
  <div className="guess-board">
    {guesses.map((guess, i) => (
      <div key={i} className="guess-row">
        {guess.map((color, j) => (
          <div
            key={j}
            className="guess-peg"
            style={{
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
