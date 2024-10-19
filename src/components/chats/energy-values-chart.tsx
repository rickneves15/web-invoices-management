'use client'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import {
  CartesianGrid,
  Legend,
  LegendProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { emerald, red } from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { DEFAULT_SELECT_OPTION } from '~/constants/select-option'
import { useQueryParams } from '~/hooks/use-query-params'
import { getEnergyValues } from '~/services/metrics'

import { Loader } from '../loader'
import { TurnOffDefaultPropsWarning } from '../turn-off-default-props-warning'
import NoResult from './chat-no-results'
import { ChartSelect } from './chat-select'

function CustomLegend(props: LegendProps) {
  const { payload } = props
  if (payload && payload.length) {
    return (
      <div className="flex justify-center">
        {payload?.map((entry, index) => (
          <div key={`item-${index}`} className="mx-2 flex items-center">
            <div
              style={{
                backgroundColor: entry.color,
                width: 10,
                height: 10,
                borderRadius: '50%',
                marginRight: 5,
              }}
            ></div>
            <span>
              {entry.value === 'consumedEnergyValue'
                ? 'Valor Consumed'
                : 'Valor Compensated'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-card-foreground flex flex-col items-center gap-1 rounded-l border p-2 text-sm shadow-sm">
        <span className="font-semibold">Mês: {label}</span>
        {payload.map((item) => (
          <div key={item.name}>
            <span className="font-semibold">
              {item.dataKey === 'consumedEnergyValue'
                ? 'Consumed'
                : 'Compensated'}
            </span>
            <span> | </span>
            <span className="font-semibold">
              {item.value?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export const EnergyValuesChart = () => {
  const { setQueryParams } = useQueryParams()
  const searchParams = useSearchParams()!

  const selectedCustomer =
    searchParams.get('customer-values') || DEFAULT_SELECT_OPTION.value

  const {
    data: energyValuesData,
    isFetching: isLoadingEnergyValues,
    error: energyValuesError,
  } = useQuery({
    retry: false,
    queryKey: ['metrics', 'energy-values', selectedCustomer],
    queryFn: () =>
      getEnergyValues(
        selectedCustomer !== DEFAULT_SELECT_OPTION.value
          ? selectedCustomer
          : undefined,
      ),
  })

  const handleResetCustomer = () => {
    setQueryParams('customer-values', DEFAULT_SELECT_OPTION.value)
  }

  const handleChange = (value: string) => {
    setQueryParams('customer-values', value)
  }

  return (
    <Card className="col-span-6">
      <TurnOffDefaultPropsWarning />
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Revenue Generated
            {isLoadingEnergyValues && (
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            )}
          </CardTitle>
          <CardDescription>
            <span className={'text-emerald-500'}>R$</span> - Real (Brazilian
            currency)
          </CardDescription>
        </div>
        <ChartSelect handleChange={handleChange} value={selectedCustomer} />
      </CardHeader>
      <CardContent>
        {energyValuesData ? (
          <>
            {energyValuesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={energyValuesData} style={{ fontSize: 12 }}>
                  <XAxis
                    dataKey="referenceMonth"
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    dy={16}
                  />

                  <YAxis
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    width={70}
                    tickFormatter={(value: number) =>
                      value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    }
                  />

                  <CartesianGrid className="!stroke-muted" vertical={false} />

                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="consumedEnergyValue"
                    stroke={red['500']}
                  />
                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="compensatedEnergyValue"
                    stroke={emerald['500']}
                  />

                  <Legend
                    verticalAlign="top"
                    align="center"
                    content={<CustomLegend />}
                  />

                  <Tooltip cursor={false} content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <NoResult text="No data found." onClick={handleResetCustomer} />
            )}
          </>
        ) : energyValuesError ? (
          <NoResult
            text="An error occurred while fetching the data."
            onClick={handleResetCustomer}
          />
        ) : (
          <Loader />
        )}
      </CardContent>
    </Card>
  )
}
