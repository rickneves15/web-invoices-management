import {
  GetInvoicesParams,
  getInvoicesParamsSchema,
  GetInvoicesResponse,
} from '~/schemas/get-invoices'
import { UploadNewInvoicesResponse } from '~/schemas/upload-new-invoices-form'

import { api } from './api'

export async function uploadInvoices(files: FileList) {
  const formData = new FormData()

  Array.from(files).forEach((file) => {
    formData.append('invoicesFiles', file)
  })

  const response = await api.post<UploadNewInvoicesResponse>(
    '/invoices/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}

export async function getInvoices(params: GetInvoicesParams) {
  const { page, perPage, customerNumber, referenceMonth } =
    getInvoicesParamsSchema.parse(params)

  console.log({ page, perPage, customerNumber, referenceMonth })

  const response = await api.get<GetInvoicesResponse>('/invoices', {
    params: {
      page,
      perPage,
      customerNumber,
      referenceMonth,
    },
  })

  return response.data
}
