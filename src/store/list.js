import concat from 'lodash/concat';
import { fromJS } from 'immutable';
// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const APPEND_LIST = 'APPEND_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REPLACE_ITEM = 'REPLACE_ITEM';

// ------------------------------------
// Actions
// ------------------------------------
export function appendList(key, state = null) {
  return {
    key,
    type: APPEND_LIST,
    payload: state
  };
}

export function receiveList(key, state = null) {
  return {
    key,
    type: RECEIVE_LIST,
    payload: state
  };
}

export function clearList(key) {
  return {
    key,
    type: CLEAR_LIST
  };
}

export function removeItem({ key, conditionKey, value }) {
  return {
    key,
    type: REMOVE_ITEM,
    payload: { conditionKey, value }
  };
}

export function replaceItem({ key, conditionKey, value, item }) {
  return {
    key,
    type: REPLACE_ITEM,
    payload: { conditionKey, value, item }
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const fetchAndAppendList = ({ request, key, reset }) => {
  return dispatch => {
    return request().then(res => {
      const { data } = res;
      if (reset) dispatch(receiveList(key, data));
      else dispatch(appendList(key, data));
      return Promise.resolve(data);
    });
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

export default function listReducer(state = initialState, action) {
  if (action.type === APPEND_LIST) {
    if (state[action.key]) {
      const key = Object.assign({}, action.payload, {
        content: state[action.key].content
          ? concat(state[action.key].content, action.payload.content)
          : action.payload.content
      });
      return Object.assign({}, state, { [action.key]: key });
    } else return Object.assign({}, state, { [action.key]: action.payload });
  } else if (action.type === CLEAR_LIST) {
    return Object.assign({}, state, { [action.key]: null });
  } else if (action.type === REMOVE_ITEM) {
    const oldContent = state[action.key].content;
    const newContent = oldContent.filter(item => {
      return item[action.payload.conditionKey] !== action.payload.value;
    });
    return fromJS(state)
      .setIn([action.key, 'content'], newContent)
      .setIn([action.key, 'totalElements'], state[action.key].totalElements - 1)
      .toJS();
  } else if (action.type === RECEIVE_LIST) {
    return Object.assign({}, state, { [action.key]: action.payload });
  } else if (action.type === REPLACE_ITEM) {
    const oldContent = state[action.key].content;
    const newContent = oldContent.map(item => {
      if (item[action.payload.conditionKey] === action.payload.value) {
        return action.payload.item;
      }
      return item;
    });
    return fromJS(state)
      .setIn([action.key, 'content'], newContent)
      .toJS();
  } else {
    return state;
  }
}
