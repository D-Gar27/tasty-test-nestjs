import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDto) {
    const category = await this.prisma.category.create({
      data,
    });
    return category;
  }

  async update(data: CategoryDto, id: string) {
    const category = await this.prisma.category.update({
      where: { id },
      data,
    });
    return category;
  }

  async findAll() {
    const category = await this.prisma.category.findMany();
    return category;
  }

  async delete(id: string) {
    await this.prisma.category.delete({
      where: { id },
    });
    return 'Success';
  }
}
