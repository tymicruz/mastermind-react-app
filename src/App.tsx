import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import Feedback from "./components/Feedback";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./logic/mastermind";
import type { FeedbackItem } from "./components/Feedback";
import "./App.css";

const emptyGuess: (Color | null)[] = [null, null, null, null];

const mockGuesses: Color[][] = [
  [Color.Red, Color.Blue, Color.Green, Color.Yellow],
  [Color.Purple, Color.Red, Color.Yellow, Color.Green],
];

const mockFeedback = [
  { correct: 2, misplaced: 1 },
  { correct: 1, misplaced: 2 },
];

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
      setGuesses((prev) => [...prev, currentGuess as Color[]]);
      setFeedbacks((prev) => [...prev, { correct: 0, misplaced: 0 }]); // Replace with real feedback logic later
      setCurrentGuess(emptyGuess);
    }
  }, [currentGuess]);

  return (
    <div className="App">
      <h1>Mastermind</h1>
      <button onClick={() => setHardMode((h) => !h)}>
        {hardMode ? "Switch to Normal Mode" : "Switch to Hard Mode"}
      </button>
      <GameBoard guesses={guesses} />
      <Feedback feedback={feedbacks} />
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
