import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from 'src/auth/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(data: SignUpDto, user: User) {
    try {
      // if trying to create an admin or webmaster throw error
      if (data.role_id < 3) throw new ForbiddenException('Unauthorized');

      // check users company
      const company = await this.prismaService.user.findUnique({
        where: { user_id: user.sub },
        select: { company_id: true },
      });

      // if trying to create user outside of company throw error
      if (company.company_id !== data.company_id) {
        throw new ForbiddenException('Unauthorized');
      }

      const hashed = await bcrypt.hash(data.user_password, 12);
      data.user_password = hashed;
      const newUser = await this.prismaService.user.create({
        data,
        select: { user_id: true, user_username: true, role_id: true },
      });

      return { res: 'User created!', user: newUser };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      if (err instanceof ForbiddenException) throw err;
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      // check users company
      const usersToSend = await this.prismaService.user.findMany({
        select: {
          user_id: true,
          user_name: true,
          user_username: true,
          user_email: true,
          user_startContract: true,
          user_endContract: true,
          company_id: true,
          role: true,
          company: {
            select: {
              company_name: true,
              company_reference: true,
              company_id: true,
              company_type: {
                select: { company_type_name: true, company_type_id: true },
              },
            },
          },
          schedule: true,
          _count: true,
        },
      });

      // if trying to create user outside of company throw error
      if (!usersToSend.length) {
        return { res: [] };
      }

      return { res: usersToSend };
    } catch (err) {
      console.log(err);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * finds the information of a user
   * @param user
   *
   * @returns User
   */

  async findMe(user: User) {
    try {
      // check users company
      const userToSend = await this.prismaService.user.findUnique({
        where: { user_id: user.sub },
        select: {
          user_id: true,
          user_name: true,
          user_username: true,
          user_email: true,
          user_startContract: true,
          user_endContract: true,
          role: true,
          company: {
            select: {
              company_name: true,
              company_id: true,
              company_type: {
                select: { company_type_name: true, company_type_id: true },
              },
            },
          },
          schedule: true,
          _count: true,
        },
      });

      if (!userToSend) {
        throw new ForbiddenException('Bad request');
      }

      return { res: userToSend };
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
