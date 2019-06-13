import makeRequest from './makeRequest';

export const postComment = data => {
  return makeRequest('post', 'comments', data);
};

export const deleteCommentById = id => {
  return makeRequest('delete', `comments/${id}`);
};

export const putComment = data => {
  return makeRequest('put', `comments/${data.id}`, data);
};
