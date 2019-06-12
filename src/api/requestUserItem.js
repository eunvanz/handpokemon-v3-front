import makeRequest from './makeRequest';

export const getUserItemsWithToken = () => {
  return makeRequest('get', 'user-items');
};

export const useItems = ({ itemId, quantity }) => {
  return makeRequest('post', `user-items/use/${itemId}?quantity=${quantity}`);
};
