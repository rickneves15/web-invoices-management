import { z } from 'zod'

export const selectOptionsSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export type SelectOption = z.infer<typeof selectOptionsSchema>
