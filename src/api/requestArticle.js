import makeRequest from './makeRequest';
import qs from 'query-string';

export const postArticle = data => {
  return makeRequest('post', 'articles', data);
};

export const getArticlesByCategoryCd = ({ categoryCd, curPage, perPage }) => {
  return makeRequest(
    'get',
    `articles/${categoryCd}?${qs.stringify({ curPage, perPage })}`
  );
};

export const putArticle = article => {
  return makeRequest('put', `articles/${article.id}`, article);
};

export const deleteArticle = id => {
  return makeRequest('delete', `articles/${id}`);
};

export const increaseArticleViewsById = id => {
  return makeRequest('put', `articles/views/${id}`);
};
