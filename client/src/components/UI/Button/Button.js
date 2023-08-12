import PropTypes from 'prop-types';

import './Button.css';
import { useCallback } from 'react';

const Button = ({ title, clickHandler, style, disabled = false }) => {
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      if (!clickHandler || disabled) {
        event.stopPropagation();
      }

      clickHandler();
    },
    [disabled, clickHandler]
  );

  return (
    <div
      className={disabled ? 'button-container disabled' : 'button-container'}
      onClick={handleClick}
      style={style}
    >
      <div className="button-inner">{title}</div>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
