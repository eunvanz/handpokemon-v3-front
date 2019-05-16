import { signInWithToken, signIn } from '../api/requestUser';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function receiveUser(user = null) {
  return {
    type: RECEIVE_USER,
    payload: user
  };
}

export function clearUser(user = null) {
  return {
    type: RECEIVE_USER,
    payload: null
  };
}

export const signInUserWithToken = () => {
  return dispatch => {
    return signInWithToken().then(res => {
      return dispatch(receiveUser(res));
    });
  };
};

export const signInUser = data => {
  return dispatch => {
    return signIn(data).then(res => {
      const { token, user } = res;
      localStorage('auth', token);
      dispatch(receiveUser(user));
      return Promise.resolve(token);
    });
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function userReducer(state = initialState, action) {
  return action.type === RECEIVE_USER ? action.payload : state;
}
