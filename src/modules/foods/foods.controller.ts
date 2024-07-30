import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateFoodDto,
  CreateFoodSchema,
  UpdateFoodDto,
  UpdateFoodSchema,
} from './foods.dto';
import { multerOptions } from '../../multer.config';
import 'multer';
import returnResponse from 'src/helpers/returnResponse';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get()
  async findAllForUser(@Query('category') category: string) {
    const foods = await this.foodService.findAllForUser(category);
    return returnResponse(foods, 'Retrieved foods', HttpStatus.OK);
  }

  @Get('admin')
  async findAllForAdmin() {
    return returnResponse(
      await this.foodService.findAllForAdmin(),
      'Retrieved foods',
      HttpStatus.OK,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Body(new ZodValidationPipe(CreateFoodSchema)) createFoodDto: CreateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return returnResponse(
      await this.foodService.create(createFoodDto, image),
      `Food created successfully`,
      HttpStatus.CREATED,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateFoodSchema)) updateFoodDto: UpdateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return returnResponse(
      await this.foodService.update(id, updateFoodDto, image),
      'Food upated successfully',
      HttpStatus.CREATED,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return returnResponse(
      await this.foodService.delete(id),
      'Food deleted successfully',
      HttpStatus.CREATED,
    );
  }
}
