import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Token } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, //TODO: IMPLEMENT REFRESH TOKEN
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Token) {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_id: payload.sub,
      },
      select: {
        user_id: true,
        user_name: true,
        user_username: true,
        user_email: true,
        user_startContract: true,
        user_endContract: true,
        role: true,
        company_id: true,
        role_id: true,
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
    return user || null;
  }
}
