import React, { useState } from "react";
import { Color } from "../logic/mastermind";

interface GuessInputProps {
  guess: (Color | null)[];
  setGuess: (guess: (Color | null)[]) => void;
  hardMode: boolean;
}

const colorOptions = Object.values(Color);

const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuess,
  hardMode,
}) => {
  const [selectedPegIndex, setSelectedPegIndex] = useState<number | null>(null);
  const availableColors = hardMode
    ? colorOptions // all colors available, even if already used
    : colorOptions.filter((option) => !guess.includes(option));

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
            onClick={() => handlePegClick(i)}
            onDoubleClick={() => handlePegDoubleClick(i)}
            style={{
              width: 40,
              height: 40,
              border:
                selectedPegIndex === i ? "2px solid blue" : "1px solid gray",
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
      <div style={{ marginTop: 12 }}>
        {availableColors.map((option) => (
          <button
            key={option}
            onClick={() => handleColorClick(option)}
            style={{ marginRight: 8 }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuessInput;
