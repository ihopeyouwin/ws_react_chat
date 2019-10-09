import {
  INTERNET_ONLINE,
  INTERNET_OFFLINE,
  WS_OPENED,
  WS_CLOSED,
} from '../actionTypes';

export const internetOnline = () => ({
  type: INTERNET_ONLINE,
});
export const internetOffline = () => ({
  type: INTERNET_OFFLINE,
});
export const wsOpened = () => ({
  type: WS_OPENED,
});
export const wsClosed = () => ({
  type: WS_CLOSED,
});
