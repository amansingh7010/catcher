import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { removeNotification } from '../../../features/notification';
import './Notification.css';

const Notification = ({ id, message, type, position }) => {
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

  return <div className={`notification ${type} ${position}`}>{message}</div>;
};

export default Notification;
