import makeRequest from './makeRequest';

export const getCodes = () => {
  return makeRequest('get', 'codes');
};
