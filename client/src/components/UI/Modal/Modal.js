import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';
import Button from '../Button/Button';

const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay = ({ title, onClose, children }) => {
  return (
    <div className="modal">
      <header className="header">
        <h2 className="header-title">{title}</h2>
      </header>
      <div className="content">{children}</div>
      <footer className="footer">
        <div className="footer-button-container">
          <Button
            title="Close"
            clickHandler={onClose}
            style={{
              backgroundColor: '#ff0000',
              fontSize: '23pt',
            }}
          />
        </div>
      </footer>
    </div>
  );
};

const Modal = ({ onClose, title, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} children={children} onClose={onClose} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
