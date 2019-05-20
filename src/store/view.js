// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_VIEW = 'RECEIVE_VIEW';
export const CLEAR_VIEW = 'CLEAR_VIEW';

// ------------------------------------
// Actions
// ------------------------------------
export function receiveView(key, state = null) {
  return {
    key,
    type: RECEIVE_VIEW,
    payload: state
  };
}

export function clearView(key) {
  return {
    key,
    type: CLEAR_VIEW
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const fetchView = ({ request, key }) => {
  return dispatch => {
    return request().then(data => {
      dispatch(receiveView(key, data));
      return Promise.resolve(data);
    });
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function viewReducer(state = initialState, action) {
  if (action.type === RECEIVE_VIEW) {
    return Object.assign({}, state, { [action.key]: action.payload });
  } else if (action.type === CLEAR_VIEW) {
    return Object.assign({}, state, { [action.key]: null });
  } else {
    return state;
  }
}
