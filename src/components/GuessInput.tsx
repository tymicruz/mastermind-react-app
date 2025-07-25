import React, { useState } from "react";
import { Color } from "../logic/mastermind";

interface GuessInputProps {
  guess: (Color | null)[];
  setGuess: (guess: (Color | null)[]) => void;
  hardMode: boolean;
  disabled?: boolean;
}

const colorOptions = Object.values(Color);

const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuess,
  hardMode,
  disabled,
}) => {
  const [selectedPegIndex, setSelectedPegIndex] = useState<number | null>(null);

  // Handle peg selection/deselection
  const handlePegClick = (i: number) => {
    setSelectedPegIndex(selectedPegIndex === i ? null : i);
  };

  const handlePegDoubleClick = (index: number) => {
    // Update the selected peg
    setGuess(guess.map((c, i) => (i === index ? null : c)));
    setSelectedPegIndex(null); // Optionally deselect after choosing
  };

  // Handle color selection
  const handleColorClick = (color: Color) => {
    if (selectedPegIndex !== null) {
      // Update the selected peg
      setGuess(guess.map((c, i) => (i === selectedPegIndex ? color : c)));
      setSelectedPegIndex(null); // Optionally deselect after choosing
    } else {
      // Fill the leftmost empty peg
      const firstEmpty = guess.findIndex((c) => c === null);
      if (firstEmpty !== -1) {
        setGuess(guess.map((c, i) => (i === firstEmpty ? color : c)));
      }
    }
  };

  return (
    <div>
      <h3>Your Guess:</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        {guess.map((color, i) => (
          <div
            key={i}
            className="guess-peg"
            onClick={() => handlePegClick(i)}
            onDoubleClick={() => handlePegDoubleClick(i)}
            style={{
              background: color || "#eee",
              border:
                selectedPegIndex === i ? "2px solid blue" : "2px solid gray",
            }}
          >
            {color?.charAt(0)}
          </div>
        ))}
      </div>
      <div className="guess-row" style={{ marginTop: 12 }}>
        {colorOptions.map((color) => {
          const isUsed = !hardMode && guess.includes(color);
          return (
            <button
              key={color}
              onClick={() => !isUsed && !disabled && handleColorClick(color)}
              className="guess-peg"
              style={{
                marginRight: 8,
                background: isUsed ? "#ccc" : color,
                cursor: isUsed || disabled ? "not-allowed" : "pointer",
                opacity: isUsed || disabled ? 0.5 : 1,
              }}
            >
              {color?.charAt(0)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GuessInput;
