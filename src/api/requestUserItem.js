import makeRequest from './makeRequest';
import { ITEM_TYPE } from '../constants/codes';

export const getUserItemsWithToken = () => {
  return makeRequest('get', 'user-items');
};

export const useItems = ({ itemId, quantity }) => {
  return makeRequest(
    'post',
    `user-items/use/${itemId}?quantity=${quantity}`
  ).then(res => {
    if (res.data.itemTypeCd === ITEM_TYPE.PICK) {
      return makeRequest('get', 'user-achievements/refresh').then(uaRes => {
        return Promise.resolve({ data: res.data, achievements: uaRes.data });
      });
    } else {
      return Promise.resolve(res);
    }
  });
};
