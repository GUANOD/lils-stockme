import { User } from ".";

export type Schedule = {
  id: number;
  start: Date;
  end: Date;
  user: User;
};
