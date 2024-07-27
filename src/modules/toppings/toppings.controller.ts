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
}
