import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateToppingItemDto, UpdateToppingItemDto } from './toppingItem.dto';

@Injectable()
export class ToppingItemService {
  constructor(private prisma: PrismaService) {}

  async create(createToppingItemDto: CreateToppingItemDto) {
    return this.prisma.toppingItem.create({
      data: createToppingItemDto,
    });
  }

  async findAll() {
    return this.prisma.topping.findMany();
  }

  async update(id: string, updateToppingItemDto: UpdateToppingItemDto) {
    return this.prisma.toppingItem.update({
      where: { id: id },
      data: updateToppingItemDto,
    });
  }

  async remove(id: string) {
    return this.prisma.toppingItem.delete({
      where: { id },
    });
  }
}
