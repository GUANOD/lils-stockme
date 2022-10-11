import { IsNotEmpty, IsString } from "class-validator";

export class Company_type {
  @IsNotEmpty()
  @IsString()
  company_type_name: string;
}
