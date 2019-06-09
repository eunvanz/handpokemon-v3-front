import makeRequest from './makeRequest';

export const getStartPick = () => {
  return makeRequest('get', 'collections/start-pick');
};

export const getPick = ({ repeatCnt, gradeCds, attrCds }) => {
  return makeRequest(
    'get',
    `collections/pick?repeatCnt=${repeatCnt}&gradeCds=${gradeCds}&attrCds=${attrCds}`
  ).then(pickRes => {
    return makeRequest('get', 'user-achievements/refresh').then(uaRes => {
      return Promise.resolve({ data: pickRes.data, achievements: uaRes.data });
    });
  });
};

export const getCollectionsByUserId = userId => {
  return makeRequest('get', `collections/user/${userId}`);
};

export const getUserCollectionsWithToken = () => {
  return makeRequest('get', `collections/token`);
};

export const getMixedCollection = collectionIds => {
  return makeRequest(
    'get',
    `collections/mix?collectionIds=${collectionIds}`
  ).then(pickRes => {
    return makeRequest('get', 'user-achievements/refresh').then(uaRes => {
      return Promise.resolve({ data: pickRes.data, achievements: uaRes.data });
    });
  });
};

export const getEvolutedCollection = collectionId => {
  return makeRequest(
    'get',
    `collections/evolute?collectionId=${collectionId}`
  ).then(pickRes => {
    return makeRequest('get', 'user-achievements/refresh').then(uaRes => {
      return Promise.resolve({ data: pickRes.data, achievements: uaRes.data });
    });
  });
};
