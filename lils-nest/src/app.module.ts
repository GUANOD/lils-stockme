import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CompaniesModule } from "./companies/companies.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
