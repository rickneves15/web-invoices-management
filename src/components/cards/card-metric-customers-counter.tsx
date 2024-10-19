'use client'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Users } from 'lucide-react'

import { CardMetricSkeleton } from '~/components/skeletons/card-metric-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getTotalCustomers } from '~/services/metrics'

export function CardMetricCustomersCounter() {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['metrics', 'total-customers'],
    queryFn: getTotalCustomers,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total Customers
        </CardTitle>
        {isLoading ? (
          <Loader2 className="text-muted-foreground size-4 animate-spin" />
        ) : (
          <Users className="text-muted-foreground size-4" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {data ? (
          <>
            <span className="text-2xl font-bold">{data.total}</span>

            <p className="text-muted-foreground text-xs">
              <span
                className={`${
                  data.difference > 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {data.difference > 0 ? `+${data.difference}` : data.difference}
              </span>{' '}
              customers since last month
            </p>
          </>
        ) : (
          <CardMetricSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
