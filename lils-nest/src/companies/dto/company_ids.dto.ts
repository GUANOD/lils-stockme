import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export class Company_ids {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
