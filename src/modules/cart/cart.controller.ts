import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './cart.dto';
import { UserAuthGuard } from '../auth/user.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  @UseGuards(UserAuthGuard)
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
  @Post()
  @UseGuards(UserAuthGuard)
  async addFoodToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addFoodToCart(createCartDto);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCartItem(id, updateCartDto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async removeCartItem(@Param('id') id: string) {
    return this.cartService.removeCartItem(id);
  }
}
