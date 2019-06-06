import { combineReducers } from 'redux';

import userReducer from './user';
import uiReducer from './ui';
import viewReducer from './view';
import codesReducer from './codes';
import filterReducer from './filter';

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
  view: viewReducer,
  codes: codesReducer,
  filter: filterReducer
});
