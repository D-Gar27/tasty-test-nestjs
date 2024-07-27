import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export class CategoryDto extends createZodDto(CategorySchema) {}
