import { isScreenSize, SCREEN_SIZE } from '../libs/screenSize';

// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const RECEIVE_UI = 'RECEIVE_UI';

// ------------------------------------
// Actions
// ------------------------------------
export function toggleDrawer(show = false) {
  return {
    type: SHOW_DRAWER,
    payload: show
  };
}

export function receiveUi(key, payload) {
  return {
    type: RECEIVE_UI,
    key,
    payload
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isOpenDrawer: isScreenSize.largerThan(SCREEN_SIZE.MD)
};
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return Object.assign({}, state, { isOpenDrawer: action.payload });
    case RECEIVE_UI:
      return Object.assign({}, state, { [action.key]: action.payload });
    default:
      return state;
  }
}
