import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [PrismaModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
