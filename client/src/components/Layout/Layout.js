import { useState } from 'react';
import { useSelector } from 'react-redux';

import './Layout.css';
import StartMenu from '../StartMenu/StartMenu';
import PlayArena from '../PlayArena/PlayArena';
import EndMenu from '../EndMenu/EndMenu';
import { NEW_GAME, IN_GAME, END_GAME } from '../../constants/game-states';
import Modal from '../UI/Modal/Modal';

function Layout() {
  const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const gameState = useSelector((state) => state.gameState.value);

  // Game can have 3 states
  // 1. New Game
  // 2. In Game
  // 3. End Game
  const renderScreen = () => {
    switch (gameState) {
      case NEW_GAME:
        return (
          <StartMenu
            openLeaderBoard={() => setLeaderBoardOpen(true)}
            openInstructions={() => setInstructionsOpen(true)}
          />
        );
      case IN_GAME:
        return <PlayArena />;
      case END_GAME:
        return <EndMenu openLeaderBoard={() => setLeaderBoardOpen(true)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="layout">
        <div className="layout-container">{renderScreen()}</div>
      </div>
      {leaderBoardOpen && (
        <Modal title="LeaderBoard" onClose={() => setLeaderBoardOpen(false)}>
          <h1>Testtt</h1>
        </Modal>
      )}
      {instructionsOpen && (
        <Modal title="How to Play" onClose={() => setInstructionsOpen(false)}>
          <h1>Instructions go here</h1>
        </Modal>
      )}
    </>
  );
}

export default Layout;
