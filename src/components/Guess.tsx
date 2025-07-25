import React from "react";
import { Color } from "../logic/mastermind";
import Feedback from "./Feedback";
import type { FeedbackItem } from "./Feedback";

interface GuessProps {
  guess: (Color | null)[];
  feedback: FeedbackItem;
}

const Guess: React.FC<GuessProps> = ({ guess, feedback }) => (
  <div className="guess-row">
    {/* Guess pegs */}
    {guess.map((color, j) => (
      <div
        key={j}
        className="guess-peg"
        style={{ background: color || "#ccc", opacity: color ? 1 : 0.5 }}
      >
        {color ? color?.charAt(0) : ""}
      </div>
    ))}

    {/* Single feedback */}
    <Feedback feedback={[feedback]} />
  </div>
);

export default Guess;
