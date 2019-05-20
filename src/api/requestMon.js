import makeRequest from './makeRequest';

export const postMon = mon => {
  return makeRequest('post', 'mons', mon);
};

export const getMon = id => {
  return makeRequest('get', `mons/${id}`);
};

export const putMon = mon => {
  return makeRequest('put', `mons/${mon.id}`, mon);
};

export const getAllMons = () => {
  return makeRequest('get', 'mons');
};
