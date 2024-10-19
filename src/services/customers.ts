import { GetCustomersResponse } from '~/schemas/get-customers'

import { api } from './api'

export async function getCustomers() {
  const response = await api.get<GetCustomersResponse>('/customers')

  return response.data
}
