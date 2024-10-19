'use client'

import { z } from 'zod'

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
})

// export const env = envSchema.parse(process.env)
export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})
