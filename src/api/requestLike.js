import qs from 'query-string';
import makeRequest from './makeRequest';

export const postLike = data => {
  return makeRequest('post', 'likes', data);
};

export const deleteLikeById = id => {
  return makeRequest('delete', `likes/${id}`);
};

export const getLikes = ({ conditionKey, conditionValue }) => {
  return makeRequest(
    'get',
    `likes?${qs.stringify({ conditionKey, conditionValue })}`
  );
};
