import { z } from 'zod';

export const CheckoutSchema = z.object({
  user_id: z.string().uuid(),
  total_price: z.number().positive(),
});

export type CheckoutDto = z.infer<typeof CheckoutSchema>;
