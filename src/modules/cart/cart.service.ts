import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto, UpdateCartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(id: string) {
    const result = await this.prisma.cart.findUnique({
      where: { user_id: id },
      select: {
        id: true,
        cartItems: {
          select: {
            id: true,
            quantity: true,
            remark: true,
            created_at: true,
            food: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                discount_price: true,
              },
            },
            toppings: {
              select: {
                toppingItem: {
                  select: {
                    id: true,
                    topping_id: true,
                    name: true,
                    add_on_price: true,
                    created_at: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transform the data to the desired structure
    if (result) {
      const transformedResult = {
        ...result,
        cartItems: result.cartItems.map((item) => ({
          ...item,
          toppings: item.toppings.map((topping) => ({
            ...topping.toppingItem,
          })),
        })),
      };
      return transformedResult;
    }
    return [];
  }

  async addFoodToCart(createCartDto: CreateCartDto) {
    const {
      userId,
      foodId,
      quantity,
      remark,
      toppingItemIds = [],
    } = createCartDto;

    const cart = await this.prisma.cart.create({ data: { user_id: userId } });

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
