import { z } from 'zod'

export const GetEnergyStatsResponseSchema = z.object({
  referenceMonth: z.string(),
  energyConsumption: z.number(),
  energyCompensated: z.number(),
})

export type GetEnergyStatsResponse = z.infer<
  typeof GetEnergyStatsResponseSchema
>
