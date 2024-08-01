import { z } from 'zod';

export const CreateCartDto = z.object({
  userId: z.string().uuid(),
  foodId: z.string().uuid(),
  quantity: z.number().positive(),
  remark: z.string().optional(),
  toppingItemIds: z.array(z.string().uuid()).optional(),
  isTakeOut: z.boolean().optional().default(false),
});

export const UpdateCartDto = z.object({
  quantity: z.number().positive(),
});

export type CreateCartDto = z.infer<typeof CreateCartDto>;
export type UpdateCartDto = z.infer<typeof UpdateCartDto>;
