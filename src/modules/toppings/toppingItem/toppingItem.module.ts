import { Module } from '@nestjs/common';
import { ToppingItemService } from './toppingItem.service';
import { ToppingItemsController } from './toppingItem.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ToppingItemsController],
  providers: [ToppingItemService],
})
export class ToppingItemsModule {}
