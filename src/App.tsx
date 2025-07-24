import GameBoard from "./components/GameBoard";
import GuessInput from "./components/GuessInput";
import Feedback from "./components/Feedback";
import ColorPicker from "./components/ColorPicker";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Mastermind</h1>
      <GameBoard />
      <Feedback />
      <GuessInput />
      <ColorPicker />
    </div>
  );
}

export default App;
