import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      Q:"am i json??",
      A:"or are we dancer?"
    };
  }
}
