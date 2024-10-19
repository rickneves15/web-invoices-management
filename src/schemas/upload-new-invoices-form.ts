import { z } from 'zod'

import { ACCEPTED_TYPES, MAX_FILE_SIZE } from '~/lib/file'

import { invoiceSchema } from './invoice'

export const uploadNewInvoicesFormSchema = z.object({
  invoicesFiles: z
    .any()
    .refine((files) => files?.length > 0, 'Please select at least one file.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Invoices must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB.`,
    )
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      'Invoices must be in PDF format.',
    ),
})

export type UploadNewInvoicesForm = z.infer<typeof uploadNewInvoicesFormSchema>

export const uploadNewInvoicesResponseSchema = z.array(invoiceSchema)

export type UploadNewInvoicesResponse = z.infer<
  typeof uploadNewInvoicesResponseSchema
>
