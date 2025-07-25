import React from "react";
import { Color } from "../logic/mastermind";
import type { FeedbackItem } from "./Feedback";
import Feedback from "./Feedback";
import Guess from "./Guess";

interface GameBoardProps {
  guesses: Color[][];
  feedbacks: FeedbackItem[];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses, feedbacks }) => (
  <div className="guess-board">
    {guesses.map((guess, i) => (
      <Guess key={i} guess={guess} feedback={feedbacks[i]} />
    ))}
  </div>
);

export default GameBoard;
