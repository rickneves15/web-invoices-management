import { Controller, useForm } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'

import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { MONTH_OPTIONS } from '~/constants/date'
import { DEFAULT_SELECT_OPTION } from '~/constants/select-option'
import { capitalizeWords } from '~/lib/string'
import { InvoiceTableFiltersSchema } from '~/schemas/invoices-table-filters'
import { getCustomers } from '~/services/customers'

export function InvoicesTableFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const customerNumber = searchParams.get('customerNumber') ?? undefined
  const referenceMonth = searchParams.get('referenceMonth') ?? undefined

  const { handleSubmit, reset, control } = useForm<InvoiceTableFiltersSchema>({
    defaultValues: {
      customerNumber: customerNumber ?? DEFAULT_SELECT_OPTION.value,
      referenceMonth: referenceMonth ?? DEFAULT_SELECT_OPTION.value,
    },
  })

  const { data: customers } = useQuery({
    retry: false,
    queryKey: ['get-customers'],
    queryFn: getCustomers,
  })

  const handleFilter = (data: InvoiceTableFiltersSchema) => {
    const customerNumber = data.customerNumber
    const referenceMonth = data.referenceMonth

    const params = new URLSearchParams(searchParams)

    if (customerNumber && customerNumber !== DEFAULT_SELECT_OPTION.value) {
      params.set('customerNumber', customerNumber)
    } else {
      params.delete('customerNumber')
    }
    if (referenceMonth && referenceMonth !== DEFAULT_SELECT_OPTION.value) {
      params.set('referenceMonth', referenceMonth)
    } else {
      params.delete('referenceMonth')
    }

    params.set('page', '1')

    const newUrl = `${pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams)

    params.delete('customerNumber')
    params.delete('referenceMonth')

    const newUrl = `${pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)

    reset({
      customerNumber: DEFAULT_SELECT_OPTION.value,
      referenceMonth: DEFAULT_SELECT_OPTION.value,
    })
  }

  const hasAnyFilter = !!customerNumber || !!referenceMonth

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-wrap items-center gap-2"
    >
      <Controller
        control={control}
        name="customerNumber"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DEFAULT_SELECT_OPTION.value}>
                  All customers
                </SelectItem>
                {customers?.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={String(customer.customerNumber)}
                  >
                    {capitalizeWords(customer.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }}
      />

      <Controller
        control={control}
        name="referenceMonth"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DEFAULT_SELECT_OPTION.value}>
                  All months
                </SelectItem>
                {MONTH_OPTIONS.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="default">
        <Search className="mr-2 h-4 w-4" />
        Filter invoices
      </Button>

      <Button
        type="button"
        variant="outline"
        size="default"
        disabled={!hasAnyFilter}
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Clear filters
      </Button>
    </form>
  )
}
