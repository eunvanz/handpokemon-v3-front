export default request => {
  return request
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      console.log('err', err);
      return Promise.reject(err.response.data.message);
    });
};
