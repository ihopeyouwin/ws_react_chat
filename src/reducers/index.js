import { combineReducers } from 'redux';
import connection from './connection';
import messages from './messages';
import settings from './settings';

export default combineReducers({
  connection,
  messages,
  settings,
});
