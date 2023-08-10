import PropTypes from 'prop-types';

import boat from '../../../assets/boat.png';
import './Boat.css';

const Boat = ({ style }) => (
  <div style={style}>
    <img className="boat" src={boat} alt="Boat" />
  </div>
);

Boat.propTypes = {
  style: PropTypes.object.isRequired,
};

export default Boat;
