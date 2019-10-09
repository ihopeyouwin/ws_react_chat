import { NICKNAME_CHANGED } from '../actionTypes';

const initialState = {
  settings: {
    nickname: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NICKNAME_CHANGED:
      return {
        ...state,
        settings: { ...state.settings, nickname: action.payload.nickname },
      };
    default:
      return state;
  }
};
