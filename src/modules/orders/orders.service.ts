import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './checkout.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(checkoutDto: CheckoutDto) {
    const { user_id, total_price } = checkoutDto;

    // Retrieve the user's cart
    const cart = await this.prisma.cart.findUnique({
      where: { user_id },
      include: {
        cartItems: {
          include: {
            toppings: true,
            food: true,
          },
        },
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Create the order
    const order = await this.prisma.order.create({
      data: {
        user_id: user_id,
        total_price: total_price,
        status: 'success',
        orderItems: {
          create: cart.cartItems.map((item) => ({
            food_id: item.food_id,
            quantity: item.quantity,
            price: item.food.price,
            remark: item.remark,
            toppings: {
              create: item.toppings.map((topping) => ({
                topping_item_id: topping.topping_item_id,
              })),
            },
          })),
        },
      },
    });

    // Clear the cart
    const cartItemIds = cart.cartItems.map((item) => item.id);

    await this.prisma.cartItemTopping.deleteMany({
      where: { cart_item_id: { in: cartItemIds } },
    });

    await this.prisma.cartItem.deleteMany({
      where: { id: { in: cartItemIds } },
    });

    await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async getOrder(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            food: true,
            toppings: {
              include: {
                toppingItem: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
      },
    });
  }

  async getAllOrders(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const orders = await this.prisma.order.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const totalOrders = await this.prisma.order.count();

    return {
      data: orders,
      page,
      limit,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    };
  }
}
