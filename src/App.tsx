import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import {
  Color,
  EMPTY_FEEDBACKS,
  EMPTY_GUESS,
  EMPTY_GUESSES,
  generateRandomCode,
} from "./logic/mastermind";
import type { FeedbackItem } from "./components/Feedback";
import "./App.css";

const calculateFeedback = (guess: Color[], code: Color[]) => {
  let correct = 0;
  let misplaced = 0;

  // Markers for matched positions
  const codeUsed = Array(code.length).fill(false);
  const guessUsed = Array(guess.length).fill(false);

  // First pass: correct positions
  for (let i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) {
      correct++;
      codeUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // Second pass: misplaced
  for (let i = 0; i < guess.length; i++) {
    if (!guessUsed[i]) {
      for (let j = 0; j < code.length; j++) {
        if (!codeUsed[j] && guess[i] === code[j]) {
          misplaced++;
          codeUsed[j] = true;
          break;
        }
      }
    }
  }

  return { correct, misplaced };
};

function App() {
  const [hardMode, setHardMode] = useState(false); // HARD MODE: Set to true to enable hard mode
  const [currentGuess, setCurrentGuess] =
    useState<(Color | null)[]>(EMPTY_GUESS);

  const [guesses, setGuesses] = useState<(Color[] | null)[]>(EMPTY_GUESSES);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(EMPTY_FEEDBACKS);
  const [code, setCode] = useState<Color[]>(() => generateRandomCode(hardMode));
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [selectedPegIndex, setSelectedPegIndex] = useState<number | null>(null);

  const isGameWon = feedbacks.some((feedback) => feedback.correct === 4);
  const isGameOver = isGameWon || nextIndex === -1;
  const isGameStarted =
    guesses.some((guess) => guess && guess.some((color) => color !== null)) ||
    currentGuess.some((peg) => peg !== null); // Game started when any guess has actual colors or current guess has pegs
  (window as any).secretCode = code;

  const resetGame = () => {
    setGuesses(EMPTY_GUESSES);
    setFeedbacks(EMPTY_FEEDBACKS);
    setCurrentGuess(EMPTY_GUESS);
    setCode(generateRandomCode(hardMode)); // Generate new code on reset
    setNextIndex(0); // Reset nextIndex
    setSelectedPegIndex(null); // Reset selected peg
  };

  // Reset game when mode changes
  const handleModeToggle = () => {
    setHardMode((h) => !h); // Just toggle, let useEffect handle reset
  };

  // Reset game whenever hardMode changes
  useEffect(() => {
    resetGame();
  }, [hardMode]);

  // Handle peg selection in the active row
  const handlePegClick = (rowIndex: number, pegIndex: number) => {
    if (rowIndex === nextIndex) {
      setSelectedPegIndex(selectedPegIndex === pegIndex ? null : pegIndex);
    }
  };

  // Handle peg clearing in the active row
  const handlePegDoubleClick = (rowIndex: number, pegIndex: number) => {
    if (rowIndex === nextIndex) {
      setCurrentGuess((prev) =>
        prev.map((color, i) => (i === pegIndex ? null : color))
      );
      setSelectedPegIndex(null);
    }
  };

  useEffect(() => {
    // Update the current row with the current guess
    if (nextIndex !== -1) {
      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[nextIndex] = currentGuess as Color[];
        return newGuesses;
      });
    }
  }, [currentGuess, nextIndex]);

  useEffect(() => {
    // Check if all pegs are filled
    if (currentGuess.every((c) => c !== null)) {
      // Submit the guess
      const feedback = calculateFeedback(currentGuess as Color[], code);

      if (nextIndex !== -1) {
        // Update the specific row with feedback
        setFeedbacks((prev) => {
          const newFeedbacks = [...prev];
          newFeedbacks[nextIndex] = feedback;
          return newFeedbacks;
        });
      }

      setCurrentGuess(EMPTY_GUESS);
      // Move to next empty row
      const newNextIndex = guesses.findIndex(
        (guess, index) => index > nextIndex && guess === null
      );
      setNextIndex(newNextIndex);
    }
  }, [currentGuess, code, nextIndex]);

  return (
    <div className="App">
      <div className="game-container">
        <h1>Mastermind</h1>
        <div className="game-controls">
          <div
            className={`mode-indicator ${
              hardMode ? "hard" : "normal"
            } mode-info ${!isGameStarted ? "active" : ""}`}
            onClick={handleModeToggle}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>Mode: {hardMode ? "Hard" : "Easy"}</strong>
              <br />
              {hardMode
                ? "Code can use repeated colors"
                : "Code uses unique colors only"}
            </p>
          </div>
          {!isGameStarted ? (
            <button onClick={() => resetGame()}>Reset Game</button>
          ) : isGameOver ? (
            <button onClick={() => resetGame()}>
              {isGameWon ? "You Won!\nPlay Again" : "Game Over!\nTry Again"}
            </button>
          ) : (
            <button onClick={() => resetGame()}>Reset Game</button>
          )}
        </div>
        <div className="code-display">
          <div className="code-row">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="code-peg"
                  style={{
                    background: isGameOver ? code[i] : "#333",
                    color: isGameOver ? "white" : "white",
                    border: "2px solid #e2e8f0" /* Add border */,
                    transition: "all 0.2s ease" /* Add transition */,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" /* Add shadow */,
                  }}
                >
                  {isGameOver ? code[i]?.charAt(0).toUpperCase() : "?"}
                </div>
              ))}
          </div>
        </div>
        <div className="game-board">
          <GameBoard
            guesses={guesses}
            feedbacks={feedbacks}
            currentGuess={currentGuess}
            nextIndex={nextIndex}
            onPegClick={handlePegClick}
            onPegDoubleClick={handlePegDoubleClick}
            selectedPegIndex={selectedPegIndex}
            isGameOver={isGameOver}
          />
        </div>
        <div className="input-section">
          <GuessInput
            guess={currentGuess}
            setGuess={setCurrentGuess}
            hardMode={hardMode}
            disabled={isGameOver}
            selectedPegIndex={selectedPegIndex}
            setSelectedPegIndex={setSelectedPegIndex}
            isGameOver={isGameOver}
            isGameWon={isGameWon}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
