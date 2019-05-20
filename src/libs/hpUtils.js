import { ROLE, GRADE } from '../constants/codes';

export const isAdminUser = user => {
  return user.role === ROLE.ADMIN;
};

export const getMonImageUrl = monOrCol => {
  if (monOrCol.mon)
    return monOrCol.mon.monImages.filter(
      monImage => monImage.seq === monOrCol.imageSeq
    )[0].url;
  else return monOrCol.monImages.length > 0 ? monOrCol.monImages[0].url : null;
};

export const getClassNameFromGradeCd = gradeCd => {
  if (gradeCd === GRADE.BASIC) return 'basic';
  else if (gradeCd === GRADE.SPECIAL) return 'special';
  else if (gradeCd === GRADE.RARE) return 'rare';
  else if (gradeCd === GRADE.S_RARE) return 's-rare';
  else if (gradeCd === GRADE.ELITE) return 'elite';
  else if (gradeCd === GRADE.LEGEND) return 'legend';
};
