import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './checkout.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(checkoutDto: CheckoutDto) {
    const { user_id, total_price, ...rest } = checkoutDto;

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
        ...rest,
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
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
        name: true,
        phone: true,
        address: true,
        type: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            order_id: true,
            food_id: true,
            quantity: true,
            price: true,
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
                    name: true,
                    add_on_price: true,
                    topping: {
                      select: {
                        label: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    const transformedOrderItems = order.orderItems.map((item) => ({
      id: item.id,
      order_id: item.order_id,
      food_id: item.food_id,
      quantity: item.quantity,
      price: item.price,
      remark: item.remark,
      created_at: item.created_at.toISOString(),
      food: {
        id: item.food.id,
        name: item.food.name,
        price: item.food.price,
        image: item.food.image,
        discount_price: item.food.discount_price,
      },
      toppings: item.toppings.map((topping) => ({
        id: topping.toppingItem.id,
        name: topping.toppingItem.name,
        add_on_price: topping.toppingItem.add_on_price,
      })),
    }));

    return {
      id: order.id,
      total_price: order.total_price,
      status: order.status,
      name: order.name,
      phone: order.phone,
      address: order.address,
      type: order.type,
      created_at: order.created_at.toISOString(),
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      orderItems: transformedOrderItems,
    };
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
        type: true,
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
        type: true,
        name: true,
        phone: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    const totalOrders = await this.prisma.order.count();

    return {
      data: orders,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
      },
    };
  }
}
