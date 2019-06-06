// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_FILTER = 'RECEIVE_FILTER';
export const UPDATE_FILTER = 'UPDATE_FILTER';

// ------------------------------------
// Actions
// ------------------------------------
export function receiveFilter(payload = false) {
  return {
    type: RECEIVE_FILTER,
    payload: payload
  };
}

export function updateFilter(key, payload) {
  return {
    type: UPDATE_FILTER,
    key,
    payload
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FILTER:
      return action.payload;
    case UPDATE_FILTER:
      return Object.assign({}, state, { [action.key]: action.payload });
    default:
      return state;
  }
}
