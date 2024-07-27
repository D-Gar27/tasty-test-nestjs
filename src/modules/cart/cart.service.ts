import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto, UpdateCartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addFoodToCart(createCartDto: CreateCartDto) {
    const {
      userId,
      foodId,
      quantity,
      remark,
      toppingItemIds = [],
    } = createCartDto;

    const cart = await this.prisma.cart.findUnique({
      where: { user_id: userId },
    });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartItem = await this.prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        food_id: foodId,
        quantity,
        remark: remark || '',
        toppings: {
          create: toppingItemIds.map((toppingItemId) => ({
            topping_item_id: toppingItemId,
          })),
        },
      },
    });
    return cartItem;
  }

  async updateCartItem(id: string, updateCartDto: UpdateCartDto) {
    const { quantity } = updateCartDto;

    const cartItem = await this.prisma.cartItem.update({
      where: { id },
      data: {
        quantity,
      },
    });

    return cartItem;
  }

  async removeCartItem(id: string) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
