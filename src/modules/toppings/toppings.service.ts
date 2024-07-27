import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToppingDto, UpdateToppingDto } from './toppings.dto';

@Injectable()
export class ToppingsService {
  constructor(private prisma: PrismaService) {}
  async getAll(data: string) {
    const toppings = await this.prisma.topping.findMany({
      where: { food_id: data },
      include: {
        items: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return toppings;
  }
  async create(data: CreateToppingDto) {
    const isFoodExist = await this.prisma.food.findUnique({
      where: { id: data.food_id },
    });
    if (!isFoodExist) throw new NotFoundException('Food id is not found');
    const topping = await this.prisma.topping.create({ data });
    return topping;
  }
  async update(data: UpdateToppingDto, id: string) {
    const topping = await this.prisma.topping.update({
      where: { id: id },
      data,
    });
    return topping;
  }
  async delete(id: string) {
    await this.prisma.toppingItem.deleteMany({
      where: { topping_id: id },
    });
    await this.prisma.topping.delete({
      where: { id },
    });
    return 'success';
  }
}
