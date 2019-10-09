import { NICKNAME_CHANGED } from '../actionTypes';

export const changeNickname = nickname => ({
  type: NICKNAME_CHANGED,
  payload: { nickname },
});
