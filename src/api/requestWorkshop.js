import makeRequest from './makeRequest';

export const getAllWorkshops = ({ perPage, curPage }) => {
  return makeRequest('get', `workshops?curPage=${curPage}&perPage=${perPage}`);
};
