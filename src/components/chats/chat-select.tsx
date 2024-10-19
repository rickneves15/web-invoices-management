import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { DEFAULT_SELECT_OPTION } from '~/constants/select-option'
import { capitalizeWords } from '~/lib/string'
import { getCustomers } from '~/services/customers'

type ChartSelectProps = {
  value: string
  handleChange: (value: string) => void
}

export function ChartSelect({ handleChange, value }: ChartSelectProps) {
  const [options, setOptions] = useState([DEFAULT_SELECT_OPTION])

  const { data: customers } = useQuery({
    retry: false,
    queryKey: ['metrics', 'get-customers'],
    queryFn: getCustomers,
  })

  useEffect(() => {
    if (customers) {
      setOptions((prevOptions) => [
        ...prevOptions,
        ...customers.map((customer) => {
          return {
            value: String(customer.customerNumber),
            label: capitalizeWords(customer.name),
          }
        }),
      ])
    }
  }, [customers])

  return (
    <div className="flex items-center gap-2">
      <Label>Customers:</Label>
      <Select onValueChange={handleChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a customer" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
