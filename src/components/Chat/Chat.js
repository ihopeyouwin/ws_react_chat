import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import ChatInputArea from '../ChatInputArea/ChatInputArea';
import s from './chat.module.css';

export default () => (
  <div className={s.chat}>
    <ChatHeader />
    <MessageList />
    <ChatInputArea />
  </div>
);
