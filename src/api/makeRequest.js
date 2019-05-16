import request from './request';
import response from './response';

export default (method, ...args) => {
  return response(request()[method](...args));
};
