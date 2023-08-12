import boat from '../../assets/boat.png';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import e1 from '../../assets/e1.png';
import e2 from '../../assets/e2.png';
import './Instructions.css';

const Instructions = () => (
  <div className="instructions-container">
    <ul>
      <li>
        Use your mouse to control the boat
        <img className="instructions-image" src={boat} alt="Boat" />
        and catch the falling items.
      </li>
      <li>
        The game lasts for <strong>60 seconds.</strong>
      </li>
      <li>
        <span>Friends</span>
        <strong style={{ color: 'green' }}> +50 points</strong>
        <img className="instructions-image" src={p1} alt="Player" />
        <img className="instructions-image" src={p2} alt="Player" />
        <img className="instructions-image" src={p3} alt="Player" />
        <img className="instructions-image" src={p4} alt="Player" />
      </li>
      <li>
        <span>Enemies</span>
        <strong style={{ color: '#e60000' }}> -100 points</strong>
        <img className="instructions-image" src={e1} alt="Player" />
        <img className="instructions-image" src={e2} alt="Player" />
      </li>
    </ul>
  </div>
);

export default Instructions;
