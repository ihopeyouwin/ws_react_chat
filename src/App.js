import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {messageSent, receiveMessage} from './actions/messages';
import {changeNickname} from './actions/settings';
import {DateTime} from 'luxon';
import Chat from './components/Chat/Chat';
import inetcheck from './hooks/inetcheck';
import wshook from './hooks/wshook';
import {sendNotification} from './utils';

const App = ({
               wsserver,
               nickname,
               changeNickname,
               websocketIsOpened,
               receiveMessage,
               messagesPreparedForSending,
               messageSent
             }) => {
  const wscallbacks = useMemo(
      () => ({
        onMessage: msg => {
          const receivedMessages = JSON.parse(msg.data)
              .reverse()
              .map(msg => {
                return {...msg, time: DateTime.fromMillis(msg.time)};
              });
          receiveMessage(receivedMessages);
          sendNotification(receivedMessages);
        },
      }),
      [receiveMessage]
  );

  const {isOnline} = inetcheck();
  const ws = wshook({
    isOnline,
    wsserver,
    callbacks: wscallbacks,
  });

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
      changeNickname(JSON.parse(savedNickname));
    }
  }, [changeNickname]);

  useEffect(() => {
    localStorage.setItem('nickname', JSON.stringify(nickname));
  }, [nickname]);

  useEffect(() => {
    if (websocketIsOpened && messagesPreparedForSending.length) {
      ws.send(
          JSON.stringify({
            from: nickname,
            message: messagesPreparedForSending[0].message,
          })
      );
      messageSent();
    }
  }, [
    ws,
    nickname,
    messageSent,
    websocketIsOpened,
    messagesPreparedForSending,
  ]);

  return <Chat/>;
};

export default connect(
    state => ({
      nickname: state.settings.settings.nickname,
      websocketIsOpened: state.connection.ws.isOpened,
      messagesPreparedForSending: state.messages.messagesPreparedForSending,
    }),
    {receiveMessage, messageSent, changeNickname}
)(App);
