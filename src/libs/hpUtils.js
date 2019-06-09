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

export const getGradeCdFromTitle = title => {
  if (title.endsWith('트레이너')) return GRADE.BASIC;
  else if (title.endsWith('레인저')) return GRADE.RARE;
  else if (title.endsWith('짐리더')) return GRADE.SPECIAL;
  else if (title.endsWith('챔피언')) return GRADE.S_RARE;
  else if (title.endsWith('마스터')) return GRADE.ELITE;
};

export const proceedPickActions = ({
  viewActions,
  userActions,
  prevUserCollections,
  achieved,
  pickedMons
}) => {
  viewActions.receiveView('prevUserCollections', prevUserCollections);
  viewActions.receiveView('pickedMons', pickedMons);
  viewActions.receiveView('achieved', achieved);
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
  if (user) {
    return (
      col.baseTotal +
      col.addedTotal +
      getTotalBurfFromColAndUser(col, user) +
      getTotalBurfFromUserAchievements(user.achievements)
    );
  } else {
    // 회원가입 시
    return col.baseTotal;
  }
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
    if (user) {
      return (
        Math.round(
          (val * getBonusPctByAttrCdFromBook(col.mainAttrCd, user.books)) / 120
        ) + accm
      );
    } else {
      // 회원가입 시 용도
      return val + accm;
    }
  }, 0);
};

export const isUserBookMon = (books, col) => {
  return !!books.filter(item => item.colId === col.id)[0];
};

export const getBurfFromUserAchievements = userAchievements => {
  const activated = userAchievements.filter(item => item.activated);
  return activated.reduce(
    (accm, item) => {
      const burfs = item.achievement.burf.split(',');
      return accm.map((item, idx) => item + Number(burfs[idx]));
    },
    [0, 0, 0, 0, 0, 0]
  );
};

export const getTotalBurfFromUserAchievements = userAchievements => {
  return getBurfFromUserAchievements(userAchievements).reduce(
    (accm, value) => accm + value,
    0
  );
};
