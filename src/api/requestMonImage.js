import makeRequest from './makeRequest';

export const postMonImage = ({ url, monId, designer }) => {
  return makeRequest('post', 'mon-images', { url, monId, designer });
};

export const deleteMonImage = id => {
  return makeRequest('delete', `mon-images/${id}`);
};

export const getMonImage = id => {
  return makeRequest('get', `mon-images/${id}`);
};

export const putMonImage = monImage => {
  return makeRequest('put', `mon-images/${monImage.id}`, monImage);
};
