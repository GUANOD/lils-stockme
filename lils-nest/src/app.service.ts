import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    return {
      Q: "are we json??",
      A: "or are we dancer?",
    };
  }
}
