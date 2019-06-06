import makeRequest from './makeRequest';

export const getAllAchievements = () => {
  return makeRequest('get', 'achievements');
};
