import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import s from './message.module.css';

const From = styled.span`
  color: ${({ currentUserNickname, sender }) =>
    currentUserNickname === sender
      ? 'rgb(167, 115, 219)'
      : 'rgb(185, 123, 94)'};
`;

const Message = ({ time, message, from: sender, nickname }) => (
  <div className={s.msgarea}>
    <span className={s.timestamp}>{`[${time.toLocaleString(
      DateTime.DATETIME_SHORT
    )}]`}</span>
    <From currentUserNickname={nickname} sender={sender}>{`${sender}:`}</From>
    <span>{message}</span>
  </div>
);

export default connect(state => ({
  nickname: state.settings.settings.nickname,
}))(Message);
