import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./Auth.service";

@Controller()
export class AuthController{
  constructor(private authService:AuthService){}

  @Get('/')
  hello(){
    return 'hello';
  }
}