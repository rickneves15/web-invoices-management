import { z } from 'zod'

export const invoicesTableFiltersSchema = z.object({
  customerNumber: z.string().optional(),
  referenceMonth: z.string().optional(),
})

export type InvoiceTableFiltersSchema = z.infer<
  typeof invoicesTableFiltersSchema
>
