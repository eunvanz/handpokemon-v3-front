import makeRequest from './makeRequest';

export const getUserAchievementsWithToken = () => {
  return makeRequest('get', 'user-achievements/token');
};
