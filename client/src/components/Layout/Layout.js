import { useSelector } from 'react-redux';

import './Layout.css';
import StartMenu from '../StartMenu/StartMenu';
import PlayArena from '../PlayArena/PlayArena';
import EndMenu from '../EndMenu/EndMenu';
import { NEW_GAME, IN_GAME, END_GAME } from '../../constants/game-states';

function Layout() {
  const gameState = useSelector((state) => state.gameState.value);

  console.log(gameState);

  // Game can have 3 states
  // 1. New Game
  // 2. In Game
  // 3. End Game
  const renderScreen = () => {
    switch (gameState) {
      case NEW_GAME:
        return <StartMenu />;
      case IN_GAME:
        return <PlayArena />;
      case END_GAME:
        return <EndMenu />;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      <div className="layout-container">{renderScreen()}</div>
    </div>
  );
}

export default Layout;
