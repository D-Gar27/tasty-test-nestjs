import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateUserDto,
  CreateUserSchema,
  LogingUserDto,
  LoginUserSchema,
} from '../users/users.dto';
import returnResponse from 'src/helpers/returnResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  async login(@Body() data: LogingUserDto) {
    return returnResponse(
      await this.authService.login(data, false),
      'Login Success',
      HttpStatus.OK,
    );
  }
  @Post('admin-login')
  @UsePipes(new ZodValidationPipe(LoginUserSchema))
  async adminLogin(@Body() data: LogingUserDto) {
    return returnResponse(
      await this.authService.login(data, true),
      'Login Success',
      HttpStatus.OK,
    );
  }

  @Post('make-admin/:id')
  async makeAdmin(@Param('id') id: string) {
    return returnResponse(
      await this.authService.makeAdmin(id),
      'He is admin now',
      HttpStatus.OK,
    );
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Body() data: CreateUserDto) {
    return returnResponse(
      await this.authService.register(data),
      'User created successfully',
      HttpStatus.CREATED,
    );
  }
}
