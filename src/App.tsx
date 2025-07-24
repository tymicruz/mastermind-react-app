import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import Feedback from "./components/Feedback";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./logic/mastermind";
import "./App.css";

const initialGuess: (Color | null)[] = [null, null, null, null];

const mockGuesses: Color[][] = [
  [Color.Red, Color.Blue, Color.Green, Color.Yellow],
  [Color.Purple, Color.Red, Color.Yellow, Color.Green],
];

const mockFeedback = [
  { correct: 2, misplaced: 1 },
  { correct: 1, misplaced: 2 },
];

function App() {
  const [currentGuess, setCurrentGuess] =
    useState<(Color | null)[]>(initialGuess);
  const [hardMode, setHardMode] = useState(false);
  return (
    <div className="App">
      <h1>Mastermind</h1>
      <button onClick={() => setHardMode((h) => !h)}>
        {hardMode ? "Switch to Normal Mode" : "Switch to Hard Mode"}
      </button>
      <GameBoard guesses={mockGuesses} />
      <Feedback feedback={mockFeedback} />
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
