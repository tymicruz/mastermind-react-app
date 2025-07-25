import React, { useState } from "react";
import { Color } from "../logic/mastermind";

interface GuessInputProps {
  guess: (Color | null)[];
  setGuess: (guess: (Color | null)[]) => void;
  hardMode: boolean;
  disabled?: boolean;
  selectedPegIndex: number | null;
  setSelectedPegIndex: (index: number | null) => void;
  isGameOver?: boolean;
  isGameWon?: boolean;
  onReset?: () => void;
}

const colorOptions = Object.values(Color);

const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuess,
  hardMode,
  disabled,
  selectedPegIndex,
  setSelectedPegIndex,
  isGameOver = false,
  isGameWon = false,
  onReset,
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
      <h3>
        {isGameOver ? (isGameWon ? "You Won!" : "Game Over!") : "Your Guess:"}
      </h3>
      <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
        <div className="guess-row">
          {isGameOver ? (
            <button
              onClick={onReset}
              style={{
                width: "100%",
                height: "40px",
                padding: "8px 12px",
                fontSize: "10px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0",
                whiteSpace: "pre-line",
                lineHeight: "1.2",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              ↻ Play Again
            </button>
          ) : (
            guess.map((color, i) => (
              <div
                key={i}
                className="guess-peg active"
                onClick={() => handlePegClick(i)}
                onDoubleClick={() => handlePegClear(i)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handlePegClear(i);
                }}
                style={{
                  background: color || "#eee",
                  border:
                    selectedPegIndex === i
                      ? "2px solid #0056b3"
                      : "2px solid gray",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {color?.charAt(0).toUpperCase()}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Show color options always, but disable when game is over */}
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
                border: isUsed
                  ? "2px solid #a0aec0"
                  : "2px solid #cbd5e0" /* Darker border for used colors */,
                cursor: isUsed || disabled ? "not-allowed" : "pointer",
                opacity: isUsed || disabled ? 0.5 : 1,
              }}
            >
              {color?.charAt(0).toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuessInput;
