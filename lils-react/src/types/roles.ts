export enum Roles {
  webmaster = 1,
  admin = 2,
  manager = 3,
  employee = 4,
}

export type Role = {
  role_id: number;
  role_name: string;
  role_hours: number;
};
