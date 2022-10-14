import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { SignUpDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
