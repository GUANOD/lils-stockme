import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *
   * @returns
   *
   */
  @Post('google')
  authGoogle() {
    return 'hi';
  }

  /**
   *
   * @returns
   *
   */
  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  /**
   *
   * @returns
   *
   */
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
