import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import Feedback from "./components/Feedback";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./logic/mastermind";
import "./App.css";

const mockGuesses: Color[][] = [
  [Color.Red, Color.Blue, Color.Green, Color.Yellow],
  [Color.Purple, Color.Red, Color.Yellow, Color.Green],
];

const mockFeedback = [
  { correct: 2, misplaced: 1 },
  { correct: 1, misplaced: 2 },
];

function App() {
  return (
    <div className="App">
      <h1>Mastermind</h1>
      <GameBoard guesses={mockGuesses} />
      <Feedback feedback={mockFeedback} />
      <GuessInput />
      <ColorPicker />
    </div>
  );
}

export default App;
