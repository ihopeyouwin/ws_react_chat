import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import { DateTime } from 'luxon';

const MessageListWrapper = styled(ScrollToBottom).attrs(() => ({}))`
  padding-left: 10px;
  overflow-wrap: break-word;
  overflow-y: auto;
  border-top: 1px solid #cccccc;
  }
`;

const MessageList = ({ messages, messagesPreparedForSending, nickname }) => (
  <MessageListWrapper>
    {messages.map(({ id, time, message, from }) => (
      <Message key={id} time={time} message={message} from={from} />
    ))}
    {messagesPreparedForSending.map(({ id, message }) => (
      <Message
        key={id}
        time={DateTime.fromMillis(Date.now())}
        message={message}
        from={nickname}
        notSent
      />
    ))}
  </MessageListWrapper>
);

export default connect(state => ({
  messages: state.messages.messages,
  messagesPreparedForSending: state.messages.messagesPreparedForSending,
  nickname: state.settings.settings.nickname,
}))(MessageList);
