import { z } from 'zod'

export const paginationSchema = z.object({
  total: z.number(),
  lastPage: z.number(),
  currentPage: z.number(),
  perPage: z.number(),
  prev: z.number().nullable(),
  next: z.number().nullable(),
})

export type Pagination = z.infer<typeof paginationSchema>
