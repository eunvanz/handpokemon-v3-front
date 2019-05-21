import { ATTR, GRADE } from './codes';

export const COLOR = {
  LIGHT_GRAY: '#dbdbdb',
  DARK_GRAY: '#545454',
  PRIMARY: '#03a9f4',
  GOLD: '#f9c957',
  AMBER: '#ff9800',
  GREEN: '#8bc34a'
};

export const ATTR_COLOR = {
  [ATTR.NORMAL]: '#9e9e9e',
  [ATTR.FIRE]: '#f44336',
  [ATTR.WATER]: '#2196f3',
  [ATTR.LIGHTNING]: '#ffc107',
  [ATTR.PLANT]: '#8bc34a',
  [ATTR.ICE]: '#00bcd4',
  [ATTR.AIR]: '#607d8b',
  [ATTR.FAIRY]: '#e91e63',
  [ATTR.EARTH]: '#795548',
  [ATTR.POISON]: '#9c27b0',
  [ATTR.FIGHT]: '#ff5772',
  [ATTR.PSYCHIC]: '#ff6699',
  [ATTR.BUG]: '#4caf50',
  [ATTR.ROCK]: '#666633',
  [ATTR.GHOST]: '#673ab7',
  [ATTR.DRAGON]: '#3f51b5',
  [ATTR.EVIL]: '#000000',
  [ATTR.IRON]: '#009688'
};

export const GRADE_STYLE = {
  [GRADE.BASIC]: { backgroundColor: '#fee188', color: '#996633' },
  [GRADE.SPECIAL]: { backgroundColor: '#66ccff', color: '#003399' },
  [GRADE.RARE]: { backgroundColor: '#8ae68a', color: '#003300' },
  [GRADE.S_RARE]: { backgroundColor: '#b9b9ff', color: '#6600ff' },
  [GRADE.ELITE]: { backgroundColor: '#ff91b5', color: '#993366' },
  [GRADE.LEGEND]: { backgroundColor: '#ffa86f', color: '#800000' }
};
