// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FoodsModule } from './modules/foods/foods.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ToppingsModule } from './modules/toppings/toppings.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ToppingItemsModule } from './modules/toppings/toppingItem/toppingItem.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    FoodsModule,
    OrdersModule,
    ToppingsModule,
    ToppingItemsModule,
    CartModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Route for accessing the files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
