'use client'
import { useQuery } from '@tanstack/react-query'
import { Leaf, Loader2 } from 'lucide-react'

import { CardMetricSkeleton } from '~/components/skeletons/card-metric-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getTotalEnergyCompensated } from '~/services/metrics'

export function CardMetricTotalEnergyCompensated() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-energy-compensated'],
    queryFn: getTotalEnergyCompensated,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total Energy Compensated
        </CardTitle>
        {isLoading ? (
          <Loader2 className="text-muted-foreground size-4 animate-spin" />
        ) : (
          <Leaf className="text-muted-foreground size-4" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {data ? (
          <>
            <span className="text-2xl font-bold">{data.total}</span>

            <p className="text-muted-foreground text-xs">
              <span className={'text-emerald-500'}>KWh</span> - (Kilowatt-hora)
            </p>
          </>
        ) : (
          <CardMetricSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
