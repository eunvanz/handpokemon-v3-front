import { signInWithToken, signIn } from '../api/requestUser';
import { getUserCollectionsWithToken } from '../api/requestCollection';
import { getBooksByToken } from '../api/requestBook';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

// ------------------------------------
// Actions
// ------------------------------------
export function receiveUser(user = null) {
  return {
    type: RECEIVE_USER,
    payload: user
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: null
  };
}

export function receiveUserCollections(collections = null) {
  return {
    type: RECEIVE_COLLECTIONS,
    payload: collections
  };
}

export function receiveUserBooks(books = null) {
  return {
    type: RECEIVE_BOOKS,
    payload: books
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

export function fetchUserBooksWithToken() {
  return dispatch => {
    return getBooksByToken().then(res => {
      dispatch(receiveUserBooks(res.data));
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
        collections: state ? state.collections : null,
        books: state ? state.books : null
      });
    case CLEAR_USER:
      return null;
    case RECEIVE_COLLECTIONS:
      return Object.assign({}, state || null, {
        collections: action.payload
      });
    case RECEIVE_BOOKS:
      return Object.assign({}, state || null, { books: action.payload });
    default:
      return state;
  }
}
