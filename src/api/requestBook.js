import makeRequest from './makeRequest';

export const getBooksByToken = () => {
  return makeRequest('get', 'books/token');
};

export const getBooksByUserId = userId => {
  return makeRequest('get', `books/user/${userId}`);
};

export const postBook = book => {
  return makeRequest('post', 'books', book);
};

export const deleteBook = bookId => {
  return makeRequest('delete', `books/${bookId}`);
};
