import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToppingDto, UpdateToppingDto } from './toppings.dto';
import {
  CreateToppingItemDto,
  UpdateToppingItemDto,
} from './toppingItem/toppingItem.dto';

@Injectable()
export class ToppingsService {
  constructor(private prisma: PrismaService) {}
  async getAll(data: string) {
    const toppings = await this.prisma.topping.findMany({
      where: { food_id: data },
      include: {
        items: true,
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
  async delete(data: string) {
    await this.prisma.topping.delete({
      where: { id: data },
    });
    return 'success';
  }

  async createItem(data: CreateToppingItemDto) {
    const isToppingExist = await this.prisma.topping.findUnique({
      where: { id: data.topping_id },
    });
    if (!isToppingExist) throw new NotFoundException('Topping is not found');
    const toppingItem = await this.prisma.toppingItem.create({ data });
    return toppingItem;
  }
  async updateItem(data: UpdateToppingItemDto, id: string) {
    const toppingItem = await this.prisma.toppingItem.update({
      where: { id },
      data,
    });
    return toppingItem;
  }
  async deleteItem(data: string) {
    await this.prisma.toppingItem.delete({
      where: { id: data },
    });
    return 'success';
  }
}
