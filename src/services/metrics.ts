import { GetEnergyStatsResponse } from '~/schemas/get-energy-stats'
import { GetEnergyValuesResponse } from '~/schemas/get-energy-values'
import {
  GenericMetricResponse,
  GetTotalEnergyCompensatedResponse,
  GetTotalEnergyConsumptionResponse,
} from '~/schemas/metrics'

import { api } from './api'

export async function getTotalInvoices() {
  const response = await api.get<GenericMetricResponse>(
    '/metrics/total-invoices',
  )

  return response.data
}

export async function getTotalCustomers() {
  const response = await api.get<GenericMetricResponse>(
    '/metrics/total-customers',
  )
  return response.data
}

export async function getTotalEnergyCompensated() {
  const response = await api.get<GetTotalEnergyCompensatedResponse>(
    '/metrics/total-energy-compensated',
  )
  return response.data
}

export async function getTotalEnergyConsumption() {
  const response = await api.get<GetTotalEnergyConsumptionResponse>(
    '/metrics/total-energy-consumption',
  )
  return response.data
}

export async function getEnergyStats(customerNumber?: string) {
  const response = await api.get<GetEnergyStatsResponse[]>(
    '/metrics/energy-stats',
    {
      params: {
        customerNumber,
      },
    },
  )

  return response.data
}

export async function getEnergyValues(customerNumber?: string) {
  const response = await api.get<GetEnergyValuesResponse[]>(
    '/metrics/energy-values',
    {
      params: {
        customerNumber,
      },
    },
  )

  return response.data
}
