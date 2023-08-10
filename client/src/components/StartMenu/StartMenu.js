import Button from '../Button/Button';
import './StartMenu.css';
import logo from '../../assets/p1.png';

const StartMenu = () => (
  <div className="start-menu-container">
    <img src={logo} className="App-logo" alt="logo" />
    <div>
      <Button title="Play" />
      <Button title="Leader Board" />
    </div>
  </div>
);

export default StartMenu;
