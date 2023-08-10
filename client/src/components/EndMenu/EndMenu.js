import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../UI/Button/Button';
import { NEW_GAME } from '../../constants/game-states';
import { updateGameState } from '../../features/game-state';
import { updateScore } from '../../features/score';
import './EndMenu.css';

export const EndMenu = () => {
  const [playerName, setPlayerName] = useState('');
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  const playAgainHandler = () => {
    dispatch(updateScore(0));
    dispatch(updateGameState(NEW_GAME));
  };

  const playerNameChangeHandler = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div>
      <h1 className="game-over">GAME OVER</h1>
      <h1 className="final-score">SCORE: {score}</h1>
      <div class="player-name-container">
        <input
          type="text"
          value={playerName}
          placeholder="Your Name"
          onChange={playerNameChangeHandler}
        />
        <Button
          title="Submit"
          style={{ backgroundColor: '#39e600', fontSize: '23pt' }}
        />
      </div>
      <Button title="Play Again" clickHandler={playAgainHandler} />
      <Button title="Leader Board" />
    </div>
  );
};

export default EndMenu;
