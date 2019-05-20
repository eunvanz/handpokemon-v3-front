export const getDetailCdNmByDetailCd = (detailCd, codes) => {
  return codes.filter(item => item.detailCd === detailCd)[0].detailCdNm;
};

export const getMasterCdGroup = (masterCd, codes) => {
  return codes.filter(item => item.masterCd === masterCd);
};
