import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wsOpened, wsClosed } from '../actions/connection';

const addEventListenersToWebsocket = (websocket, eventListenerMap) => {
  Object.keys(eventListenerMap).forEach(key => {
    if (eventListenerMap[key]) {
      websocket.addEventListener(key, eventListenerMap[key]);
    }
  });
};

const removeEventListenersFromWebsocket = (websocket, eventListenerMap) => {
  Object.keys(eventListenerMap).forEach(key => {
    if (eventListenerMap[key]) {
      websocket.removeEventListener(key, eventListenerMap[key]);
    }
  });
};

export default ({ isOnline, wsserver, restartInMs = 2000, callbacks = {} }) => {
  const websocketRef = useRef(null);
  const dispatchAction = useDispatch();

  useEffect(() => {
    const closeWebsocket = () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      dispatchAction(wsClosed());
    };

    const openWebsocket = () => {
      websocketRef.current = new WebSocket(wsserver);
    };

    const restartWebsocket = () => {
      removeEventListenersFromWebsocket(websocketRef.current, eventListenerMap);
      closeWebsocket();
      openWebsocket();
      addEventListenersToWebsocket(websocketRef.current, eventListenerMap);
    };

    const { onOpen, onClose, onMessage, onError } = callbacks;
    const eventListenerMap = {
      open: e => {
        dispatchAction(wsOpened());
        if (onOpen) {
          onOpen(e);
        }
      },
      close: e => {
        if (onClose) {
          onClose(e);
        }

        if (e.code !== 1000) {
          setTimeout(restartWebsocket, restartInMs);
        }
      },
      message: onMessage,
      error: e => {
        if (onError) {
          onError(e);
        }
        setTimeout(restartWebsocket, restartInMs);
      },
    };

    if (isOnline) {
      openWebsocket();
      addEventListenersToWebsocket(websocketRef.current, eventListenerMap);
    } else {
      setTimeout(restartWebsocket, restartInMs);
    }

    return () => {
      closeWebsocket(1000);
      removeEventListenersFromWebsocket(websocketRef.current, eventListenerMap);
    };
  }, [wsserver, callbacks, dispatchAction, isOnline, restartInMs]);

  return websocketRef.current;
};
