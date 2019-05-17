import makeRequest from './makeRequest';

export const signIn = ({ email, password }) => {
  return makeRequest('post', 'users/sign-in', { email, password });
};

export const signInWithToken = () => {
  return makeRequest('post', 'users/token');
};

export const isDupEmail = email => {
  return makeRequest('get', `users/is-dup-email/${email}`);
};

export const isDupNickname = nickname => {
  return makeRequest('get', `users/is-dup-nickname/${nickname}`);
};
