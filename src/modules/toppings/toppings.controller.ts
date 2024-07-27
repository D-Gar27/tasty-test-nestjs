import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import returnResponse from 'src/helpers/returnResponse';
import {
  CreateToppingDto,
  CreateToppingSchema,
  UpdateToppingDto,
  UpdateToppingSchema,
} from './toppings.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateToppingItemDto,
  CreateToppingItemSchema,
  UpdateToppingItemDto,
  UpdateToppingItemSchema,
} from './toppingItem/toppingItem.dto';

@Controller('toppings')
export class ToppingsController {
  constructor(private toppingService: ToppingsService) {}

  @Get(':foodId')
  async getAll(@Param('foodId') id: string) {
    return returnResponse(
      await this.toppingService.getAll(id),
      'Toppings',
      HttpStatus.OK,
    );
  }
  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateToppingSchema))
    createFoodDto: CreateToppingDto,
  ) {
    return returnResponse(
      await this.toppingService.create(createFoodDto),
      'New topping added',
      HttpStatus.CREATED,
    );
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(UpdateToppingSchema))
    updateToppingDto: UpdateToppingDto,
    @Param('id') id: string,
  ) {
    return returnResponse(
      await this.toppingService.update(updateToppingDto, id),
      'Successfully edited',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return returnResponse(
      await this.toppingService.delete(id),
      'Successfully deleted',
      HttpStatus.OK,
    );
  }

  @Post('items')
  async createItem(
    @Body(new ZodValidationPipe(CreateToppingItemSchema))
    createItemDto: CreateToppingItemDto,
  ) {
    return returnResponse(
      await this.toppingService.createItem(createItemDto),
      'New topping item added',
      HttpStatus.CREATED,
    );
  }
  @Put('items/:id')
  async updateItem(
    @Body(new ZodValidationPipe(UpdateToppingItemSchema))
    updateItem: UpdateToppingItemDto,
    @Param('id') id: string,
  ) {
    return returnResponse(
      await this.toppingService.updateItem(updateItem, id),
      'Successfully edited',
      HttpStatus.OK,
    );
  }
  @Delete('items/:id')
  async deleteItem(@Param('id') id: string) {
    return returnResponse(
      await this.toppingService.deleteItem(id),
      'Successfully deleted',
      HttpStatus.OK,
    );
  }
}
