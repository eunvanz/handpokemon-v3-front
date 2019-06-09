import makeRequest from './makeRequest';

export const getUserAchievementsWithToken = () => {
  return makeRequest('get', 'user-achievements/token');
};

export const refreshUserAchievementsWithToken = attrCd => {
  return makeRequest(
    'get',
    `user-achievements/refresh${attrCd ? `?attrCd=${attrCd}` : ''}`
  );
};
