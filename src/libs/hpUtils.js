import { ROLE } from '../constants/codes';

export const isAdminUser = user => {
  return user.role === ROLE.ADMIN;
};

export const getMonImageUrl = monOrCol => {
  if (monOrCol.mon)
    return monOrCol.mon.monImages(
      monImage => monImage.seq === monOrCol.imageSeq
    )[0].url;
  else return monOrCol.monImages[0].url;
};
