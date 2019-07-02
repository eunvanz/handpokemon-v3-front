import makeRequest from './makeRequest';

export const getDefensesByToken = () => {
  return makeRequest('get', 'defenses/token');
};

export const getDefensesByUserId = userId => {
  return makeRequest('get', `defenses/user/${userId}`);
};

export const postDefense = defense => {
  return makeRequest('post', 'defenses', defense);
};
