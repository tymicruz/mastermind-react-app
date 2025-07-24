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

function App() {
  return (
    <div className="App">
      <h1>Mastermind</h1>
      <GameBoard guesses={mockGuesses} />
      <Feedback />
      <GuessInput />
      <ColorPicker />
    </div>
  );
}

export default App;
