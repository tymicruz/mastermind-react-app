import React from "react";
import { Color, EMPTY_GUESS } from "../logic/mastermind";
import type { FeedbackItem } from "./Feedback";
import Feedback from "./Feedback";
import Guess from "./Guess";

interface GameBoardProps {
  guesses: (Color[] | null)[];
  feedbacks: FeedbackItem[];
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses, feedbacks }) => (
  <div className="guess-board">
    {guesses
      .slice()
      .reverse()
      .map((guess, i) => (
        <Guess
          key={guesses.length - i - 1}
          guess={guess || EMPTY_GUESS}
          feedback={feedbacks[guesses.length - 1 - i]}
        />
      ))}
  </div>
);

export default GameBoard;
