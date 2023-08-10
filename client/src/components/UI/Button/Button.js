import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ title, clickHandler, style }) => (
  <div className="button-container" style={style}>
    <div className="button-inner" onClick={clickHandler}>
      {title}
    </div>
  </div>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Button;
