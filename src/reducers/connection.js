import {INTERNET_OFFLINE, INTERNET_ONLINE, WS_CLOSED, WS_OPENED,} from '../actionTypes';

const initialState = {
    internet: {
        isOnline: true,
    },
    ws: {
        isOpened: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INTERNET_ONLINE:
            return {...state, internet: {...state.internet, isOnline: true}};
        case INTERNET_OFFLINE:
            return {...state, internet: {...state.internet, isOnline: false}};
        case WS_OPENED:
            return {...state, ws: {...state.ws, isOpened: true}};
        case WS_CLOSED:
            return {
                ...state,
                ws: {...state.ws, isOpened: false},
            };
        default:
            return state;
    }
};
