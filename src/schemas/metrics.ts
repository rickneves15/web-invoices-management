import { z } from 'zod'

export const genericMetricResponseSchema = z.object({
  total: z.number(),
  difference: z.number(),
})

export type GenericMetricResponse = z.infer<typeof genericMetricResponseSchema>

export const getTotalEnergyCompensatedResponseSchema =
  genericMetricResponseSchema.pick({
    total: true,
  })

export type GetTotalEnergyCompensatedResponse = z.infer<
  typeof getTotalEnergyCompensatedResponseSchema
>
export const getTotalEnergyConsumptionResponseSchema =
  genericMetricResponseSchema.pick({
    total: true,
  })

export type GetTotalEnergyConsumptionResponse = z.infer<
  typeof getTotalEnergyConsumptionResponseSchema
>
