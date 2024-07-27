import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Enter your valid email address',
  }),
  password: z.string().min(8, {
    message: 'Password should be at least 8 characters',
  }),
});
export const LoginUserSchema = z.object({
  email: z.string().email({
    message: 'Enter your valid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export class LogingUserDto extends createZodDto(LoginUserSchema) {}
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
