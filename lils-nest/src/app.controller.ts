import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './config/guardsConstants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  // @Public()
  getHello(): object {
    return this.appService.getHello();
  }
}
