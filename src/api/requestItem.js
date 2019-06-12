import makeRequest from './makeRequest';

export const getItems = () => {
  return makeRequest('get', 'items');
};

export const buyItem = ({ itemId, quantity }) => {
  return makeRequest('get', `items/buy?itemId=${itemId}&quantity=${quantity}`);
};
