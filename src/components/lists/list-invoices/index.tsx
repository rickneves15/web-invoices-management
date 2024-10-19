'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { InvoicesTableSkeleton } from '~/components/skeletons/invoices-table-skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useQueryParams } from '~/hooks/use-query-params'
import { cn } from '~/lib/utils'
import { Invoice } from '~/schemas/invoice'
import { getInvoices } from '~/services/invoices'

import { InvoicesTableFilters } from './invoices-table-filters'
import { ListInvoiceItem } from './list-invoice-item'

export function ListInvoices() {
  const { setQueryParams } = useQueryParams()

  const searchParams = useSearchParams()

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 10
  const customerNumber = searchParams.get('customerNumber')
    ? Number(searchParams.get('customerNumber'))
    : null
  const referenceMonth = searchParams.get('referenceMonth') ?? null

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices', customerNumber, referenceMonth, page, perPage],
    queryFn: () =>
      getInvoices({
        page,
        perPage,
        customerNumber,
        referenceMonth,
      }),
  })

  const handlePrevious = () => {
    if (invoices?.meta?.prev) {
      setQueryParams('page', `${invoices?.meta?.prev}`)
    }
  }

  const handleNext = () => {
    if (invoices?.meta?.next) {
      setQueryParams('page', `${invoices?.meta?.next}`)
    }
  }

  return (
    <>
      <div className="space-y-2.5">
        <div className="flex flex-wrap justify-between">
          <InvoicesTableFilters />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customers</TableHead>
              <TableHead className="w-[140px]">Month</TableHead>
              <TableHead className="w-[140px]">Invoice Amount</TableHead>
              <TableHead className="w-[170px]">Energy Consumed</TableHead>
              <TableHead className="w-[180px]">Energy Compensated</TableHead>
              <TableHead className="w-[132px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && !invoices && <InvoicesTableSkeleton />}

            {invoices &&
              invoices.data.map((invoice: Invoice) => {
                return <ListInvoiceItem key={invoice.id} invoice={invoice} />
              })}

            {invoices && invoices.data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-10 text-center"
                >
                  No invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination className="justify-end border border-t p-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                className={cn({
                  'cursor-not-allowed opacity-50': !invoices?.meta?.prev,
                })}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                className={cn({
                  'cursor-not-allowed opacity-50': !invoices?.meta?.next,
                })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
