import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Picture Quiz Game</h1>
        <p>Look at the picture and choose the correct answer!</p>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
