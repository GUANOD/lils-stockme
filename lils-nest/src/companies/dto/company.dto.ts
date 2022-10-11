import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  company_reference: string;

  @IsString()
  @IsNotEmpty()
  company_address: string;

  @IsInt()
  @IsNotEmpty()
  company_type_id: number;
}
