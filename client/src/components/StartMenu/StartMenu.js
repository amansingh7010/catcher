import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';
import './StartMenu.css';
import logo from '../../assets/p1.png';
import { updateGameState } from '../../features/game-state';
import { IN_GAME } from '../../constants/game-states';

const StartMenu = ({ openLeaderBoard, openInstructions }) => {
  const dispatch = useDispatch();

  return (
    <div className="start-menu-container">
      <h1 className="title">Catcher</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <Button
          title="Play Game"
          clickHandler={() => dispatch(updateGameState(IN_GAME))}
        />
        <Button
          title="Leader Board"
          clickHandler={openLeaderBoard}
          style={{ backgroundColor: '#ffb31a' }}
        />
        <Button
          title="Instructions"
          clickHandler={openInstructions}
          style={{ backgroundColor: '#ff99ff' }}
        />
      </div>
    </div>
  );
};

StartMenu.propTypes = {
  openLeaderBoard: PropTypes.func.isRequired,
  openInstructions: PropTypes.func.isRequired,
};

export default StartMenu;
