import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateFoodDto, UpdateFoodDto } from './foods.dto';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFoodDto, image: Express.Multer.File) {
    const food = await this.prisma.food.create({
      data: {
        ...data,
        image: image.path.replace('\\', '/'),
      },
    });
    return food;
  }

  async findAllForUser() {
    const foods = await this.prisma.food.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
        created_at: true,
        discount_price: true,
        is_available: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        toppings: {
          select: {
            id: true,
            label: true,
            is_radio: true,
            items: true,
          },
        },
      },
      where: { is_available: true },
      orderBy: {
        created_at: 'desc',
      },
    });
    return foods;
  }

  async findAllForAdmin() {
    const foods = await this.prisma.food.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
        created_at: true,
        discount_price: true,
        is_available: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        toppings: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return foods;
  }

  async update(id: string, data: UpdateFoodDto, image?: Express.Multer.File) {
    const updatedData = image
      ? { ...data, image: image.path.replace('\\', '/') }
      : data;

    const food = await this.prisma.food.update({
      where: { id },
      data: updatedData,
    });
    return food;
  }

  async delete(id: string) {
    await this.prisma.food.delete({
      where: { id },
    });
    return 'Food item deleted successfully';
  }
}
