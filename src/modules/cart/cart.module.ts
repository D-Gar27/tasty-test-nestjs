import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
