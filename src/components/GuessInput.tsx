import React, { useState } from "react";
import { Color } from "../logic/mastermind";

interface GuessInputProps {
  guess: (Color | null)[];
  setGuess: (guess: (Color | null)[]) => void;
  hardMode: boolean;
  disabled?: boolean;
  selectedPegIndex: number | null;
  setSelectedPegIndex: (index: number | null) => void;
}

const colorOptions = Object.values(Color);

const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuess,
  hardMode,
  disabled,
  selectedPegIndex,
  setSelectedPegIndex,
}) => {
  // Handle peg selection
  const handlePegClick = (i: number) => {
    if (disabled) return;

    // If clicking the same peg, deselect it
    if (selectedPegIndex === i) {
      setSelectedPegIndex(null);
    } else {
      // Select the clicked peg
      setSelectedPegIndex(i);
    }
  };

  // Handle color selection
  const handleColorClick = (color: Color) => {
    if (disabled) return;

    if (selectedPegIndex !== null) {
      // Update the selected peg
      setGuess(guess.map((c, i) => (i === selectedPegIndex ? color : c)));
      setSelectedPegIndex(null); // Deselect after choosing
    } else {
      // If no peg is selected, fill the leftmost empty peg
      const firstEmpty = guess.findIndex((c) => c === null);
      if (firstEmpty !== -1) {
        setGuess(guess.map((c, i) => (i === firstEmpty ? color : c)));
      }
    }
  };

  // Handle peg clearing (right-click or double-click)
  const handlePegClear = (index: number) => {
    if (disabled) return;
    setGuess(guess.map((c, i) => (i === index ? null : c)));
    setSelectedPegIndex(null);
  };

  return (
    <div>
      <h3>Your Guess:</h3>
      <div className="guess-row">
        {guess.map((color, i) => (
          <div
            key={i}
            className="guess-peg"
            onClick={() => handlePegClick(i)}
            onDoubleClick={() => handlePegClear(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              handlePegClear(i);
            }}
            style={{
              background: color || "#eee",
              border:
                selectedPegIndex === i ? "2px solid #0056b3" : "2px solid gray",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {color?.charAt(0)}
          </div>
        ))}
      </div>

      {/* Show color options when game is not disabled */}
      {!disabled && (
        <div className="guess-row" style={{ marginTop: 12 }}>
          {colorOptions.map((color) => {
            const isUsed = !hardMode && guess.includes(color);
            return (
              <div
                key={color}
                onClick={() => !isUsed && !disabled && handleColorClick(color)}
                className="color-option"
                style={{
                  background: isUsed ? "#ccc" : color,
                  cursor: isUsed || disabled ? "not-allowed" : "pointer",
                  opacity: isUsed || disabled ? 0.5 : 1,
                }}
              >
                {color?.charAt(0)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GuessInput;
