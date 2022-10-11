import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { SignInDto, SignUpDto } from "./dto";
import { JwtService } from "@nestjs/jwt";

/**
 *
 *
 */
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  /**
   *
   * @returns
   *
   */
  async signIn(data: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_username: data.user_username,
      },
    });
    if (!user) throw new ForbiddenException("Invalid credentials!");

    const pwMatches = await bcrypt.compare(
      data.user_password,
      user.user_password,
    );

    if (!pwMatches) throw new ForbiddenException("Invalid credentials!");

    return this.signToken(user.user_id, user.user_username, user.role_id);
  }

  /**
   *
   * @returns
   *
   */
  async signUp(data: SignUpDto) {
    try {
      const hashed = await bcrypt.hash(data.user_password, 12);
      data.user_password = hashed;
      const user = await this.prismaService.user.create({
        data,
        select: { user_name: true },
      });
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ForbiddenException("User already exists");
        }
      }
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }

  private async signToken(
    userId: number,
    username: string,
    role: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
      role,
    };

    const token = await this.jwt.signAsync(payload, {
      // expiresIn: "1h",
      secret: process.env.JWT_SECRET,
    });

    return { access_token: token };
  }
}
