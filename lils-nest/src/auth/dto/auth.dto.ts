import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  user_password: string;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_username: string;

  @IsDateString()
  @IsNotEmpty()
  user_startContract: Date;

  @IsDateString()
  @IsOptional()
  user_endContract: Date;

  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @IsInt()
  @IsNotEmpty()
  company_id: number;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  user_password: string;

  @IsNotEmpty()
  @IsString()
  user_username: string;
}
