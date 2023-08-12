import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';
import { NEW_GAME } from '../../constants/game-states';
import { updateGameState } from '../../features/game-state';
import { updateScore } from '../../features/score';
import { addNotification } from '../../features/notification';
import './EndMenu.css';

export const EndMenu = ({ openLeaderBoard }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(null);
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  const playAgainHandler = () => {
    dispatch(updateScore(0));
    dispatch(updateGameState(NEW_GAME));
  };

  const playerNameChangeHandler = (event) => {
    setPlayerName(event.target.value);
  };

  const scoreSubmitHandler = async () => {
    setError(null);

    try {
      const response = await fetch(
        'https://catcher.amansingh.dev/api/leaderboard',
        {
          method: 'POST',
          body: JSON.stringify({ name: playerName, score }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      dispatch(
        addNotification({
          message: 'Saved Successfully!',
          type: 'success',
          position: 'bottom-center',
        })
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
      dispatch(
        addNotification({
          message: 'Error!',
          type: 'error',
          position: 'bottom-center',
        })
      );
    }
  };

  return (
    <div className="end-menu-container">
      <h1 className="game-over">GAME OVER</h1>
      <h1 className="final-score">SCORE: {score}</h1>
      <div className="player-name-container">
        <input
          type="text"
          value={playerName}
          placeholder="Player Name"
          onChange={playerNameChangeHandler}
        />
        <Button
          title="Submit"
          clickHandler={scoreSubmitHandler}
          style={{ backgroundColor: '#39e600', fontSize: '23pt' }}
        />
      </div>

      <div className="end-menu-buttons">
        <Button title="Play Again" clickHandler={playAgainHandler} />
        <Button
          title="Leader Board"
          clickHandler={openLeaderBoard}
          style={{ backgroundColor: '#ffb31a' }}
        />
      </div>
    </div>
  );
};

EndMenu.propTypes = {
  openLeaderBoard: PropTypes.func.isRequired,
};

export default EndMenu;
