import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt.guard';
import { UserAuthGuard } from './user.guard';
import { AdminAuthGuard } from './admin.guard';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    JwtStrategy,
    UserAuthGuard,
    AdminAuthGuard,
    JwtAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
