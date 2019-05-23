import { ATTR } from './codes';
import { COLOR } from './styles';

export const DUNGEON = [
  {
    attrCds: [
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
    name: '동쪽 섬',
    color: COLOR.INDIGO
  },
  {
    attrCds: [
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
    name: '서쪽 섬',
    color: COLOR.DEEP_ORANGE
  },
  {
    attrCds: Object.keys(ATTR).map(key => ATTR[key]),
    name: '중앙던전',
    color: COLOR.GRAY
  }
];
