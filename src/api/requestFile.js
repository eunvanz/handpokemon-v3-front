import makeRequest from './makeRequest';

export const postFile = ({ data, path }) => {
  return makeRequest('post', `files?path=${path}`, data);
};
