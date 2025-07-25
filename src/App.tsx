import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import Feedback from "./components/Feedback";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./logic/mastermind";
import type { FeedbackItem } from "./components/Feedback";
import "./App.css";

const emptyGuess: (Color | null)[] = [null, null, null, null];

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
  const [hardMode, setHardMode] = useState(false);
  const [currentGuess, setCurrentGuess] =
    useState<(Color | null)[]>(emptyGuess);

  const [guesses, setGuesses] = useState<Color[][]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    // Check if all pegs are filled
    if (currentGuess.every((c) => c !== null)) {
      // Submit the guess
      const feedback = calculateFeedback(currentGuess as Color[], mockCode);
      setGuesses((prev) => [...prev, currentGuess as Color[]]);
      setFeedbacks((prev) => [...prev, feedback]);
      setCurrentGuess(emptyGuess);
    }
  }, [currentGuess]);

  return (
    <div className="App">
      <h1>Mastermind</h1>
      <button onClick={() => setHardMode((h) => !h)}>
        {hardMode ? "Switch to Normal Mode" : "Switch to Hard Mode"}
      </button>
      <GameBoard guesses={guesses} feedbacks={feedbacks} />
      <GuessInput
        guess={currentGuess}
        setGuess={setCurrentGuess}
        hardMode={hardMode}
      />
      <ColorPicker />
    </div>
  );
}

export default App;
