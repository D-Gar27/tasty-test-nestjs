import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addFoodToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addFoodToCart(createCartDto);
  }

  @Patch(':id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCartItem(id, updateCartDto);
  }

  @Delete(':id')
  async removeCartItem(@Param('id') id: string) {
    return this.cartService.removeCartItem(id);
  }
}
