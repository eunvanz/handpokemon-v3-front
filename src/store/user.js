import { fromJS } from 'immutable';
import { signInWithToken, signIn } from '../api/requestUser';
import { getUserCollectionsWithToken } from '../api/requestCollection';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';

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

export function receiveUserCollections(collections = null) {
  return {
    type: RECEIVE_COLLECTIONS,
    payload: collections
  };
}

export const signInUserWithToken = () => {
  return dispatch => {
    return signInWithToken().then(res => {
      dispatch(receiveUser(res.data));
      return Promise.resolve();
    });
  };
};

export const signInUser = data => {
  return dispatch => {
    return signIn(data).then(res => {
      const { token, user } = res.data;
      localStorage.setItem('auth', token);
      dispatch(receiveUser(user));
      return Promise.resolve(token);
    });
  };
};

export function fetchUserCollectionsWithToken() {
  return dispatch => {
    return getUserCollectionsWithToken().then(res => {
      dispatch(receiveUserCollections(res.data));
      return Promise.resolve();
    });
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, action.payload, {
        collections: state ? state.collections : null
      });
    case RECEIVE_COLLECTIONS:
      return Object.assign({}, state || null, { collections: action.payload });
    default:
      return state;
  }
}
