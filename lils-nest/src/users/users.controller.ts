import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard, JwtGuard, ManagerGuard } from 'src/auth/guard';
import { SignUpDto } from 'src/auth/dto';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  @UseGuards(ManagerGuard)
  // employees cant access this route
  create(@Body() dto: SignUpDto, @GetUser() user: User) {
    return this.usersService.create(dto, user);
  }

  @Get('all')
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findUser(@GetUser() user: User) {
    return this.usersService.findMe(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
