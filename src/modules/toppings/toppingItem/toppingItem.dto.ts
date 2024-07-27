import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateToppingItemSchema = z.object({
  name: z.string(),
  topping_id: z.string(),
  add_on_price: z.number(),
});
export const UpdateToppingItemSchema = z.object({
  name: z.string(),
  add_on_price: z.number(),
});

export class CreateToppingItemDto extends createZodDto(
  CreateToppingItemSchema,
) {}
export class UpdateToppingItemDto extends createZodDto(
  UpdateToppingItemSchema,
) {}
