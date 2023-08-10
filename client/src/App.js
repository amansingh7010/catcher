import { useSelector } from 'react-redux';

import './App.css';
import StartMenu from './components/StartMenu/StartMenu';

function App() {
  const gameState = useSelector((state) => state.gameState.value);

  console.log(gameState);

  return (
    <div className="App">
      <div className="App-container">
        <StartMenu />
      </div>
    </div>
  );
}

export default App;
