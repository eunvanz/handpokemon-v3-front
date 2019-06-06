import { ATTR } from './codes';
import { COLOR } from './styles';

export const DUNGEON = [
  {
    ATTR_CDS: [
      ATTR.NORMAL,
      ATTR.FIRE,
      ATTR.POISON,
      ATTR.BUG,
      ATTR.EARTH,
      ATTR.FAIRY,
      ATTR.GHOST,
      ATTR.DRAGON,
      ATTR.ICE
    ],
    NAME: '동쪽 섬',
    COLOR: COLOR.INDIGO
  },
  {
    ATTR_CDS: [
      ATTR.ROCK,
      ATTR.AIR,
      ATTR.IRON,
      ATTR.EVIL,
      ATTR.LIGHTNING,
      ATTR.PSYCHIC,
      ATTR.PLANT,
      ATTR.FIGHT,
      ATTR.WATER
    ],
    NAME: '서쪽 섬',
    COLOR: COLOR.DEEP_ORANGE
  },
  {
    ATTR_CDS: [ATTR.ROCK],
    NAME: '테스트',
    COLOR: COLOR.LIME
  },
  {
    ATTR_CDS: Object.keys(ATTR).map(key => ATTR[key]),
    NAME: '중앙던전',
    COLOR: COLOR.GRAY
  }
];

export const CREDIT = {
  PICK: {
    INTERVAL: 1000 * 5,
    // INTERVAL: 1000 * 60 * 20,
    MAX: 12
  },
  BATTLE: {
    INTERVAL: 1000 * 5,
    // INTERVAL: 1000 * 60 * 20,
    MAX: 12
  }
};

export const BOOK_RULE = [0, 0, 0, 500, 1000, 3000];
