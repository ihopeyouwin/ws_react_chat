import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeNickname } from '../../actions/settings';
import s from './header.module.scss';

const Indicator = styled.span`
  ::before {
    background-color: ${({ online }) => (online ? 'greenyellow' : 'darkred')};
  }
`;

const ChatHeader = ({ nickname, websocketIsOpened, changeNickname }) => (
  <div className={s.header}>
    <span>
      <label htmlFor="nickinput">Write your nickname here:</label>
      <input
        type="text"
        className={s.nickinput}
        value={nickname}
        id="nickinput"
        onChange={event => changeNickname(event.target.value)}
        required
      />
    </span>
    <Indicator className={s.indicator} online={websocketIsOpened}>
      {websocketIsOpened ? 'ServerKeepsRunning' : 'Offline???...'}
    </Indicator>
  </div>
);

export default connect(
  state => ({
    nickname: state.settings.settings.nickname,
    websocketIsOpened: state.connection.ws.isOpened,
  }),
  { changeNickname }
)(ChatHeader);
