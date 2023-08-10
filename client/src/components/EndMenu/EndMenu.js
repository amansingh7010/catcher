import { useSelector, useDispatch } from 'react-redux';

import Button from '../Button/Button';
import { NEW_GAME } from '../../constants/game-states';
import { updateGameState } from '../../features/game-state';
import './EndMenu.css';

export const EndMenu = () => {
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>GAME OVER</h1>
      <h3>Your Score is {score}</h3>
      <Button
        title="Play Again"
        clickHandler={() => dispatch(updateGameState(NEW_GAME))}
      />
    </div>
  );
};

export default EndMenu;
