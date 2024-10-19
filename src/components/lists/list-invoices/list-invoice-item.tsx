import axios from 'axios'
import { ArrowDownToLine } from 'lucide-react'

import { PreviewInvoicePdfDialog } from '~/components/modals/preview-invoice-pdf-dialog'
import { Button } from '~/components/ui/button'
import { TableCell, TableRow } from '~/components/ui/table'
import { capitalizeWords } from '~/lib/string'
import { Invoice } from '~/schemas/invoice'

type ListInvoiceItemProps = {
  invoice: Invoice
}

export const ListInvoiceItem = ({ invoice }: ListInvoiceItemProps) => {
  const handleDownload = ({ invoiceUrl, customer }: Invoice) => {
    const fileName = `${customer.name} - ${invoice.referenceMonth}`
    axios({
      url: invoiceUrl,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const link = document.createElement('a')
      link.setAttribute('download', `${fileName}.pdf`)
      const href = URL.createObjectURL(response.data)
      link.href = href
      link.setAttribute('target', '_blank')
      link.click()
      URL.revokeObjectURL(href)
    })
  }

  return (
    <TableRow>
      <TableCell className="w-48 font-medium">
        {capitalizeWords(invoice.customer.name)}
      </TableCell>
      <TableCell className="font-medium">{invoice.referenceMonth}</TableCell>
      <TableCell className="font-medium">
        {invoice.totalAmount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="font-medium">
        {invoice.energyQuantity + invoice.exemptEnergyQuantity} KWh
      </TableCell>
      <TableCell className="font-medium">
        {invoice.exemptEnergyQuantity} KWh
      </TableCell>

      <TableCell className="flex gap-2">
        <PreviewInvoicePdfDialog invoiceUrl={invoice.invoiceUrl} />
        <Button
          variant="outline"
          size="default"
          onClick={() => {
            handleDownload(invoice)
          }}
        >
          <ArrowDownToLine className="size-3" />
          Download
        </Button>
      </TableCell>
    </TableRow>
  )
}
