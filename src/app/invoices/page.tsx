import { ListInvoices } from '~/components/lists/list-invoices'
import Title from '~/components/ui/title'

export default function InvoicesPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Title>Invoices</Title>
      </div>
      <div className="space-y-2.5">
        <div className="flex flex-wrap justify-between"></div>
      </div>

      <ListInvoices />
    </div>
  )
}
