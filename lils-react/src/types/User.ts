import { Company, Role, Roles, Schedule } from ".";

export type User = {
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_startContract: Date;
  user_endContract?: Date | null;
  role: Role;
  company_id: number;
  company: Company;
  color?: string;
  schedule?: Schedule[];
};
