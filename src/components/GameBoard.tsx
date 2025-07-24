import React from "react";
import { Color } from "../logic/mastermind";

interface GameBoardProps {
  guesses: Color[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses }) => (
  <div>
    {guesses.map((guess, i) => (
      <div key={i}>{guess.join(", ")}</div>
    ))}
  </div>
);

export default GameBoard;
