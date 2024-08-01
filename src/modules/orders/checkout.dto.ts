import { z } from 'zod';

export const CheckoutSchema = z.object({
  user_id: z.string().uuid(),
  total_price: z.number().positive(),
  name: z.string(),
  phone: z.string(),
  address: z.string().optional().default(''),
  type: z.string(),
});

export type CheckoutDto = z.infer<typeof CheckoutSchema>;
