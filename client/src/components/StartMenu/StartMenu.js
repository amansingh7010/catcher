import { useDispatch } from 'react-redux';

import Button from '../Button/Button';
import './StartMenu.css';
import logo from '../../assets/p1.png';
import { updateGameState } from '../../features/game-state';
import { IN_GAME } from '../../constants/game-states';

const StartMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className="start-menu-container">
      <h1>Catcher</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <Button
          title="Play"
          clickHandler={() => dispatch(updateGameState(IN_GAME))}
        />
        <Button title="Leader Board" />
      </div>
    </div>
  );
};

export default StartMenu;