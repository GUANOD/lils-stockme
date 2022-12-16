import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { SignUpDto } from 'src/auth/dto';

export class CompanyScheduleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @IsDate({ each: true })
  @Type(() => Date)
  @IsNotEmpty()
  dates: Date[];
}
