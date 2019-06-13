import makeRequest from './makeRequest';

export const postLike = data => {
  return makeRequest('post', 'likes', data);
};

export const deleteLikeById = id => {
  return makeRequest('delete', `likes/${id}`);
};
