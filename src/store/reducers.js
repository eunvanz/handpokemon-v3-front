import { combineReducers } from 'redux';

import userReducer from './user';
import uiReducer from './ui';

export default combineReducers({
  user: userReducer,
  ui: uiReducer
});
