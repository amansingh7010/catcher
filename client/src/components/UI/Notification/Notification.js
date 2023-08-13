import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { removeNotification } from '../../../features/notification';
import './Notification.css';

const Notification = ({ id, message, type }) => {
  const dispatch = useDispatch();

  // Automatically remove the notification after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeNotification(id));
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, id]);

  return <div className={`notification ${type}`}>{message}</div>;
};

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
