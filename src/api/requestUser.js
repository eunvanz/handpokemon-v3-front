import makeRequest from './makeRequest';

export const signIn = ({ email, password }) => {
  return makeRequest('post', 'users/sign-in', { email, password });
};

export const signInWithToken = () => {
  return makeRequest('post', 'users/token');
};
