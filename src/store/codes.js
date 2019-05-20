import { getCodes } from '../api/requestCode';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_CODES = 'RECEIVE_CODES';

// ------------------------------------
// Actions
// ------------------------------------
export function receiveCodes(codes = []) {
  return {
    type: RECEIVE_CODES,
    payload: codes
  };
}

export const fetchCodes = () => {
  return dispatch => {
    return getCodes().then(res => {
      dispatch(receiveCodes(res.data));
      return Promise.resolve(res.data);
    });
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function codeReducer(state = initialState, action) {
  if (action.type === RECEIVE_CODES) {
    return action.payload;
  } else {
    return state;
  }
}
