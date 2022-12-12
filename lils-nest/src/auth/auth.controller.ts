import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Public } from 'src/config/guardsConstants';
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
  @Get('google')
  authGoogle() {
    return { hi: 'hi' };
  }

  /**
   *
   * @returns
   *
   */
  @Post('signup')
  @Public()
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  /**
   *
   * @returns
   *
   */
  @Post('signin')
  @Public()
  signin(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
