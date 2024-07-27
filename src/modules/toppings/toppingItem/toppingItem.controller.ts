import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CreateToppingItemDto, UpdateToppingItemDto } from './toppingItem.dto';
import { ToppingItemService } from './toppingItem.service';
import returnResponse from 'src/helpers/returnResponse';

@Controller('topping-items')
export class ToppingItemsController {
  constructor(private readonly toppingService: ToppingItemService) {}

  @Post()
  create(@Body() createToppingItemDto: CreateToppingItemDto) {
    return this.toppingService.create(createToppingItemDto);
  }

  @Get()
  findAll() {
    return this.toppingService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateToppingItemDto: UpdateToppingItemDto,
  ) {
    return this.toppingService.update(id, updateToppingItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return returnResponse(
      await this.toppingService.remove(id),
      'Successfully deleted',
      HttpStatus.OK,
    );
  }
}
