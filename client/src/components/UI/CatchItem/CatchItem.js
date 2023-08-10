import PropTypes from 'prop-types';

import item from '../../../assets/e2.png';
import './CatchItem.css';

const CatchItem = ({ style }) => (
  <div style={style}>
    <img className="catch-item" src={item} alt="Catch Item" />
  </div>
);

CatchItem.propTypes = {
  style: PropTypes.object.isRequired,
};

export default CatchItem;
