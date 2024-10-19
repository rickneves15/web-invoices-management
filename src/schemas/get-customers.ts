import { z } from 'zod'

export const getCustomersResponse = z.array(
  z.object({
    id: z.string().cuid(),
    customerNumber: z.number(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
)

export type GetCustomersResponse = z.infer<typeof getCustomersResponse>
