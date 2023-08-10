import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ title }) => (
  <div className="button-container">
    <div className="button-inner">{title}</div>
  </div>
);

Button.propTypes = {
  title: PropTypes.string,
};

export default Button;
