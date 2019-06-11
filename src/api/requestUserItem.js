import makeRequest from './makeRequest';

export const getUserItems = () => {
  return makeRequest('get', 'user-items');
};

export const useItems = ({ itemId, quantity }) => {
  return makeRequest('get', `user-items/use/${itemId}?quantity=${quantity}`);
};
