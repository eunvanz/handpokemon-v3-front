export const isIE = () => {
  const agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('trident') !== -1 || agent.indexOf('msie') !== -1;
};

export const isEdge = () => {
  const agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('edge') !== -1;
};

export const isEmpty = value => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (value != null && typeof value === 'object' && !Object.keys(value).length)
  );
};
