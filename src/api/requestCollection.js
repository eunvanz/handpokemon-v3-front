import makeRequest from './makeRequest';

export const getStartPick = () => {
  return makeRequest('get', 'collections/start-pick');
};
