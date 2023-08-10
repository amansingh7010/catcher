import { useSelector } from 'react-redux';

import './App.css';
import StartMenu from './components/StartMenu/StartMenu';
import PlayArena from './components/PlayArena/PlayArena';
import EndMenu from './components/EndMenu/EndMenu';
import { NEW_GAME, IN_GAME, END_GAME } from './constants/game-states';

function App() {
  const gameState = useSelector((state) => state.gameState.value);

  // Game can have 3 states
  // 1. New Game
  // 2. In Game
  // 3. End Game
  let currentScreen = <StartMenu />;
  switch (gameState) {
    case NEW_GAME:
      currentScreen = <StartMenu />;
      break;
    case IN_GAME:
      currentScreen = <PlayArena />;
      break;
    case END_GAME:
      <EndMenu />;
      break;
    default:
      break;
  }

  return (
    <div className="App">
      <div className="App-container">{currentScreen}</div>
    </div>
  );
}

export default App;
