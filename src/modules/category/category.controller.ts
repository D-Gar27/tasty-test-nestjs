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
import { CategoryService } from './category.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { CategoryDto } from './category.dto';
import returnResponse from 'src/helpers/returnResponse';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return returnResponse(
      await this.categoryService.findAll(),
      'Retrieved categories',
      HttpStatus.OK,
    );
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(CategoryDto)) categoryDto: CategoryDto,
  ) {
    return returnResponse(
      await this.categoryService.create(categoryDto),
      'Category created successfully',
      HttpStatus.CREATED,
    );
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(CategoryDto)) categoryDto: CategoryDto,
  ) {
    return returnResponse(
      await this.categoryService.update(categoryDto, id),
      'Category created successfully',
      HttpStatus.CREATED,
    );
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return returnResponse(
      await this.categoryService.delete(id),
      'Category deleted successfully',
      HttpStatus.OK,
    );
  }
}
