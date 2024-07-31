import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutSchema, CheckoutDto } from './checkout.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import returnResponse from 'src/helpers/returnResponse';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(
    @Body(new ZodValidationPipe(CheckoutSchema)) checkoutDto: CheckoutDto,
  ) {
    return returnResponse(
      await this.ordersService.checkout(checkoutDto),
      'Checkout Success',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return returnResponse(
      await this.ordersService.getOrder(id),
      'Order Details',
      HttpStatus.OK,
    );
  }

  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: string) {
    return returnResponse(
      await this.ordersService.getUserOrders(userId),
      'Retrieved user orders list',
      HttpStatus.OK,
    );
  }

  @Get('admin/all')
  async getAllOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return returnResponse(
      await this.ordersService.getAllOrders(page, +limit),
      'Retrieved user orders list',
      HttpStatus.OK,
    );
  }
}
