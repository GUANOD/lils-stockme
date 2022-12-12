import { Company, Roles } from ".";

export type User = {
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_startContract: Date;
  user_endContract?: Date | null;
  role_id: Roles;
  company: Company;
  color?: string;
};
