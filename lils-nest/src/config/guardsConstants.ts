import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export enum Role {
  Inactive,
  Webmaster,
  Admin,
  Manager,
  Employee,
}
export const PRIVILEGE_LEVEL = 'privilegeLevel';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RoleRequired = (role: Role) => SetMetadata(PRIVILEGE_LEVEL, role);
