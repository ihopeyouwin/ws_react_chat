import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { internetOnline, internetOffline } from '../actions/connection';

export default () => {
  const dispatchAction = useDispatch();
  const isOnline = useSelector(state => state.connection.internet.isOnline);

  useEffect(() => {
    const handleOnline = () => {
      dispatchAction(internetOnline());
    };
    const handleOffline = () => {
      dispatchAction(internetOffline());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatchAction]);

  useEffect(() => {
    if (window.navigator.onLine && !isOnline) {
      dispatchAction(internetOnline());
    } else if (!window.navigator.onLine && isOnline) {
      dispatchAction(internetOffline());
    }
  }, [dispatchAction, isOnline]);

  return {
    isOnline,
  };
};
