import makeRequest from './makeRequest';

export const getAllWorkshops = ({ perPage, curPage }) => {
  return makeRequest('get', `workshops?curPage=${curPage}&perPage=${perPage}`);
};

export const postWorkshop = data => {
  return makeRequest('post', 'workshops', data);
};
