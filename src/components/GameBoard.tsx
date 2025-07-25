import React from "react";
import { Color, EMPTY_GUESS } from "../logic/mastermind";
import type { FeedbackItem } from "./Feedback";
import Feedback from "./Feedback";
import Guess from "./Guess";

interface GameBoardProps {
  guesses: (Color[] | null)[];
  feedbacks: FeedbackItem[];
  currentGuess: (Color | null)[];
  nextIndex: number;
  onPegClick?: (rowIndex: number, pegIndex: number) => void;
  onPegDoubleClick?: (rowIndex: number, pegIndex: number) => void;
  selectedPegIndex?: number | null;
}

const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  feedbacks,
  currentGuess,
  nextIndex,
  onPegClick,
  onPegDoubleClick,
  selectedPegIndex,
}) => (
  <div className="guess-board">
    {/* Show completed guesses */}
    {guesses
      .slice()
      .reverse()
      .map((guess, i) => {
        const originalIndex = guesses.length - 1 - i;
        const isActiveRow = originalIndex === nextIndex;

        return (
          <Guess
            key={guesses.length - i - 1}
            guess={isActiveRow ? currentGuess : guess || EMPTY_GUESS}
            feedback={feedbacks[originalIndex]}
            isActive={isActiveRow}
            onPegClick={isActiveRow ? onPegClick : undefined}
            onPegDoubleClick={isActiveRow ? onPegDoubleClick : undefined}
            rowIndex={originalIndex}
            selectedPegIndex={isActiveRow ? selectedPegIndex : null}
          />
        );
      })}
  </div>
);

export default GameBoard;
