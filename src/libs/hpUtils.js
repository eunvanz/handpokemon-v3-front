import { ROLE, GRADE } from '../constants/codes';

export const isAdminUser = user => {
  return user.role === ROLE.ADMIN;
};

export const getMonImageUrl = monOrCol => {
  if (monOrCol.mon) {
    const filteredMonImage = monOrCol.monImages.filter(
      monImage => monImage.seq === monOrCol.imageSeq
    )[0];
    if (filteredMonImage) return filteredMonImage.url;
  } else
    return monOrCol.monImages.length > 0
      ? encodeURI(monOrCol.monImages[0].url)
      : null;
};

export const getClassNameFromGradeCd = gradeCd => {
  if (gradeCd === GRADE.BASIC) return 'basic';
  else if (gradeCd === GRADE.SPECIAL) return 'special';
  else if (gradeCd === GRADE.RARE) return 'rare';
  else if (gradeCd === GRADE.S_RARE) return 's-rare';
  else if (gradeCd === GRADE.ELITE) return 'elite';
  else if (gradeCd === GRADE.LEGEND) return 'legend';
};

export const proceedPickActions = ({
  viewActions,
  userActions,
  prevUserCollections,
  pickedMons
}) => {
  viewActions.receiveView('prevUserCollections', prevUserCollections);
  viewActions.receiveView('pickedMons', pickedMons);
  userActions.signInUserWithToken();
  userActions.fetchUserCollectionsWithToken();
};

export const getBonusPctByAttrCdFromBook = (attrCd, books) => {
  const attrBooks = books.filter(book => book.attrCd === attrCd);
  const total = attrBooks.reduce(
    (accm, item) => item.col.addedTotal + item.col.baseTotal + accm,
    0
  );
  return Math.round(total / 12) / 10;
};

export const getTotalFromColAndUser = (col, user) => {
  return col.baseTotal + col.addedTotal + getTotalBurfFromColAndUser(col, user);
};

export const getTotalBurfFromColAndUser = (col, user) => {
  const {
    addedHp,
    baseHp,
    addedPower,
    basePower,
    addedArmor,
    baseArmor,
    addedSPower,
    baseSPower,
    addedSArmor,
    baseSArmor,
    addedDex,
    baseDex
  } = col;
  return [
    addedHp + baseHp,
    addedPower + basePower,
    addedArmor + baseArmor,
    addedSPower + baseSPower,
    addedSArmor + baseSArmor,
    addedDex + baseDex
  ].reduce((accm, val) => {
    return (
      Math.round(
        (val * getBonusPctByAttrCdFromBook(col.mainAttrCd, user.books)) / 120
      ) + accm
    );
  }, 0);
};

export const isUserBookMon = (books, col) => {
  return !!books.filter(item => item.colId === col.id)[0];
};
