import makeRequest from './makeRequest';

export const getStartPick = () => {
  return makeRequest('get', 'collections/start-pick');
};

export const getPick = ({ repeatCnt, gradeCds, attrCds }) => {
  return makeRequest(
    'get',
    `collections/pick?repeatCnt=${repeatCnt}&gradeCds=${gradeCds}&attrCds=${attrCds}`
  );
};
