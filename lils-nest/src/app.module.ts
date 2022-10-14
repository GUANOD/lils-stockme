import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PrismaModule, CompaniesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
