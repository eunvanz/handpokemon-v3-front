import makeRequest from './makeRequest';

export const getUnlockedBooksWithToken = () => {
  return makeRequest('get', 'unlocked-books/token');
};

export const postUnlockedBook = unlockedBook => {
  return makeRequest('post', 'unlocked-books', unlockedBook);
};
