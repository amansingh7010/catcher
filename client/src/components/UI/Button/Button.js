import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ title, clickHandler }) => (
  <div className="button-container">
    <div className="button-inner" onClick={clickHandler}>
      {title}
    </div>
  </div>
);

Button.propTypes = {
  title: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Button;
