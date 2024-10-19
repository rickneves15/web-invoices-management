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
