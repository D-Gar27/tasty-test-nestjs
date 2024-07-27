import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateToppingSchema = z.object({
  is_radio: z.boolean(),
  label: z.string(),
  food_id: z.string(),
});
export const UpdateToppingSchema = z.object({
  is_radio: z.boolean(),
  label: z.string(),
});

export class CreateToppingDto extends createZodDto(CreateToppingSchema) {}
export class UpdateToppingDto extends createZodDto(UpdateToppingSchema) {}
