import React, { useState } from 'react';
import { connect } from 'react-redux';
import { prepareMessageForSending } from '../../actions/messages';
import s from './msginput.module.css';

const ChatInputArea = ({ nickname, prepareMessageForSending }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const onCurrentMessageSend = () => {
    if (currentMessage.trim()) {
      prepareMessageForSending(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div className={s.inputwrap}>
      <input
        className={s.mesinput}
        placeholder="Write your message here(after filling a nickname)"
        autoFocus
        value={currentMessage}
        onChange={event => setCurrentMessage(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            onCurrentMessageSend();
          }
        }}
      />
      <button onClick={onCurrentMessageSend}>send</button>
    </div>
  );
};

export default connect(
  state => ({
    nickname: state.settings.settings.nickname,
  }),
  { prepareMessageForSending }
)(ChatInputArea);
