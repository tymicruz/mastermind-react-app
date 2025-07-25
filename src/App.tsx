import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import ColorPicker from "./components/ColorPicker";
import {
  Color,
  EMPTY_FEEDBACKS,
  EMPTY_GUESS,
  EMPTY_GUESSES,
} from "./logic/mastermind";
import type { FeedbackItem } from "./components/Feedback";
import "./App.css";

// TODO: remove mock code and maybe get this from the server like get this from the server.
const mockCode: Color[] = [Color.Red, Color.Blue, Color.Green, Color.Yellow];

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
  const resetGame = () => {
    setGuesses(EMPTY_GUESSES);
    setFeedbacks(EMPTY_FEEDBACKS);
    setCurrentGuess(EMPTY_GUESS);
  };
  const [hardMode, setHardMode] = useState(false);
  const [currentGuess, setCurrentGuess] =
    useState<(Color | null)[]>(EMPTY_GUESS);

  const [guesses, setGuesses] = useState<(Color[] | null)[]>(EMPTY_GUESSES);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(EMPTY_FEEDBACKS);
  const isGameWon = feedbacks.some((feedback) => feedback.correct === 4);
  const isGameOver = isGameWon || guesses.filter((g) => g === null).length == 0;
  const isGameStarted = guesses.filter((g) => g !== null).length > 0;

  useEffect(() => {
    // Check if all pegs are filled
    if (currentGuess.every((c) => c !== null)) {
      // Submit the guess
      const feedback = calculateFeedback(currentGuess as Color[], mockCode);

      const nextIndex = guesses.findIndex((guess) => guess === null);

      if (nextIndex !== -1) {
        // Update the specific row
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[nextIndex] = currentGuess as Color[];
          return newGuesses;
        });

        setFeedbacks((prev) => {
          const newFeedbacks = [...prev];
          newFeedbacks[nextIndex] = feedback;
          return newFeedbacks;
        });
      }

      setCurrentGuess(EMPTY_GUESS);
    }
  }, [currentGuess]);

  return (
    <div className="App">
      <div className="game-controls">
        {!isGameStarted && (
          <button onClick={() => setHardMode((h) => !h)}>Switch Mode</button>
        )}
        <div
          className={`mode-indicator ${hardMode ? "hard" : "normal"} mode-info`}
        >
          <p>
            <strong>Current: {hardMode ? "Hard" : "Normal"} Mode</strong>
            <br />
            {hardMode
              ? "Code can use repeated colors"
              : "Code uses unique colors only"}
          </p>
        </div>
      </div>
      <h1>Mastermind</h1>
      <div className="code-display">
        <div className="code-row">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="code-peg"
                style={{
                  background: isGameOver ? mockCode[i] : "#333",
                  color: isGameOver ? "white" : "white",
                }}
              >
                {isGameOver ? mockCode[i]?.charAt(0) : "?"}
              </div>
            ))}
        </div>
      </div>
      <GameBoard guesses={guesses} feedbacks={feedbacks} />
      <div className="input-section">
        <GuessInput
          guess={currentGuess}
          setGuess={setCurrentGuess}
          hardMode={hardMode}
          disabled={isGameOver}
        />

        <div className="reset-button-container">
          {isGameOver && (
            <button onClick={resetGame} className="reset-button">
              {isGameWon ? "You Won! Play Again" : "Game Over! Try Again"}
            </button>
          )}
        </div>
      </div>
      <ColorPicker />
    </div>
  );
}

export default App;
