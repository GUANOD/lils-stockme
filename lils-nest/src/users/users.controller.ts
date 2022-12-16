import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { SignUpDto } from 'src/auth/dto';
import { GetUser } from 'src/auth/decorator';
// import { User } from 'src/auth/entities/user.entity';
import { Role, RoleRequired } from 'src/config/guardsConstants';
import type { user } from '@prisma/client';
import { CompanyScheduleDto } from './dto/companyScheduleDto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findUser(@GetUser() user: user) {
    return { res: user };
  }

  @Get('all')
  @RoleRequired(Role.Admin)
  @UseGuards(RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('company')
  @RoleRequired(Role.Manager)
  @UseGuards(RoleGuard)
  findAllCompany(@GetUser() user: user) {
    return this.usersService.findAll(user);
  }

  @Post('company/schedule')
  @RoleRequired(Role.Manager)
  @UseGuards(RoleGuard)
  findAllCompanySchedule(
    @GetUser() user: user,
    @Body() companyScheduleDto: CompanyScheduleDto,
  ) {
    return this.usersService.findAll(user, companyScheduleDto);
  }

  @Post('createUser')
  @RoleRequired(Role.Manager)
  @UseGuards(RoleGuard)
  // employees cant access this route
  create(@Body() dto: SignUpDto, @GetUser() user: user) {
    return this.usersService.create(dto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string, @GetUser() user: user) {
    return this.usersService.remove(req, +id, user);
  }
}
