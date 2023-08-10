import PropTypes from 'prop-types';

import './CatchItem.css';

const CatchItem = ({ style, imgSrc }) => (
  <div style={style}>
    <img className="catch-item" src={imgSrc} alt="Catch Item" />
  </div>
);

CatchItem.propTypes = {
  style: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default CatchItem;
