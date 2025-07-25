import React from "react";
import { Color } from "../logic/mastermind";
import Feedback from "./Feedback";
import type { FeedbackItem } from "./Feedback";

interface GuessProps {
  guess: (Color | null)[];
  feedback: FeedbackItem;
  isActive?: boolean;
  onPegClick?: (rowIndex: number, pegIndex: number) => void;
  onPegDoubleClick?: (rowIndex: number, pegIndex: number) => void;
  rowIndex?: number;
  selectedPegIndex?: number | null;
}

const Guess: React.FC<GuessProps> = ({
  guess,
  feedback,
  isActive = false,
  onPegClick,
  onPegDoubleClick,
  rowIndex = 0,
  selectedPegIndex = null,
}) => (
  <div className="guess-row">
    {/* Arrow for active row */}
    {isActive && <div className="current-row-arrow" />}

    {/* Guess pegs */}
    {guess.map((color, j) => (
      <div
        key={j}
        className={`guess-peg ${isActive ? "active" : ""}`}
        onClick={
          isActive && onPegClick ? () => onPegClick(rowIndex, j) : undefined
        }
        onDoubleClick={
          isActive && onPegDoubleClick
            ? () => onPegDoubleClick(rowIndex, j)
            : undefined
        }
        onContextMenu={(e) => {
          if (isActive && onPegDoubleClick) {
            e.preventDefault();
            onPegDoubleClick(rowIndex, j);
          }
        }}
        style={{
          background: color || "#ccc",
          opacity: 1,
          cursor: isActive ? "pointer" : "default",
          border:
            selectedPegIndex === j ? "2px solid #0056b3" : "2px solid gray",
        }}
      >
        {color ? color?.charAt(0).toUpperCase() : ""}
      </div>
    ))}

    {/* Single feedback */}
    <Feedback feedback={feedback} />
  </div>
);

export default Guess;
