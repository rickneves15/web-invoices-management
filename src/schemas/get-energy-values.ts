import { z } from 'zod'

export const GetEnergyValuesResponseSchema = z.object({
  referenceMonth: z.string(),
  consumedEnergyValue: z.number(),
  compensatedEnergyValue: z.number(),
})

export type GetEnergyValuesResponse = z.infer<
  typeof GetEnergyValuesResponseSchema
>
