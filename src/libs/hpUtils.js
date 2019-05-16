import { ROLE } from '../constants/codes';

export const isAdminUser = user => {
  return user.role === ROLE.ADMIN;
};
