import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateFeedbackSchema = z.object({
  order_id: z.string(),
  user_id: z.string(),
  rating: z.number().int(),
  comment: z.string().optional(),
});

export class CreateFeedbackDto extends createZodDto(CreateFeedbackSchema) {}
