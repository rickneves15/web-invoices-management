import { z } from 'zod'

import { invoiceSchema } from './invoice'
import { paginationSchema } from './paginate'

export const getInvoicesParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).default(10),
  customerNumber: z.coerce.number().nullable(),
  referenceMonth: z.coerce.string().nullable(),
})

export type GetInvoicesParams = z.infer<typeof getInvoicesParamsSchema>

export const getInvoicesResponseSchema = paginationSchema.extend({
  data: z.array(invoiceSchema),
})

export type GetInvoicesResponse = z.infer<typeof getInvoicesResponseSchema>
