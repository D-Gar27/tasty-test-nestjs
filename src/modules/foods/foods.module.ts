import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodsController } from './foods.controller';

@Module({
  imports: [PrismaModule],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
