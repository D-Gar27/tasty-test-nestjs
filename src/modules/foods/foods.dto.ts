import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schema for creating a food item
export const CreateFoodSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Price must be a valid number',
    }),
  description: z.string(),
  discount_price: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => (val !== undefined ? !isNaN(val) : true), {
      message: 'Discount price must be a valid number',
    }),
  category_id: z.string().uuid(),
  is_available: z.string().transform((val) => val === 'true' || val === '1'),
});

export class CreateFoodDto extends createZodDto(CreateFoodSchema) {}

// Schema for updating a food item
export const UpdateFoodSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .optional(),
  price: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => (val !== undefined ? !isNaN(val) : true), {
      message: 'Price must be a valid number',
    }),
  description: z.string().optional(),
  discount_price: z
    .string()
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => (val !== undefined ? !isNaN(val) : true), {
      message: 'Discount price must be a valid number',
    }),
  category_id: z.string().uuid().optional(),
  is_available: z.string().transform((val) => val === 'true' || val === '1'),
});

export class UpdateFoodDto extends createZodDto(UpdateFoodSchema) {}
