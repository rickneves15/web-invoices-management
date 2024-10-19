import { z } from 'zod'

export const invoiceSchema = z.object({
  id: z.string().cuid(),
  installationNumber: z.number(),
  totalAmount: z.number(),
  referenceMonth: z.string(),
  dueDate: z.string(),
  energyQuantity: z.number(),
  energyAmount: z.number(),
  exemptEnergyQuantity: z.number(),
  exemptEnergyAmount: z.number(),
  compensatedEnergyQuantity: z.number(),
  compensatedEnergyAmount: z.number(),
  municipalPublicLightingContribution: z.number(),
  invoiceUrl: z.string().url(),
  customerId: z.number(),
  customer: z.object({
    id: z.string().cuid(),
    name: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Invoice = z.infer<typeof invoiceSchema>
