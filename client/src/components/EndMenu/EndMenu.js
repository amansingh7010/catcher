import { useSelector, useDispatch } from 'react-redux';

import Button from '../UI/Button/Button';
import { NEW_GAME } from '../../constants/game-states';
import { updateGameState } from '../../features/game-state';
import { updateScore } from '../../features/score';
import './EndMenu.css';

export const EndMenu = () => {
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  const playAgainHandler = () => {
    dispatch(updateScore(0));
    dispatch(updateGameState(NEW_GAME));
  };

  return (
    <div>
      <h1>GAME OVER</h1>
      <h3>Your Score is {score}</h3>
      <Button title="Play Again" clickHandler={playAgainHandler} />
    </div>
  );
};

export default EndMenu;
