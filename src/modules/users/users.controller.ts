import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import returnResponse from 'src/helpers/returnResponse';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return returnResponse(users, 'Users retrieved successfully', HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return returnResponse(user, 'User retrieved successfully', HttpStatus.OK);
  }
}
