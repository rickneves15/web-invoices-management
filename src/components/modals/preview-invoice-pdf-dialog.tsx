import { useState } from 'react'

import { ReceiptText } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

type PreviewInvoicePdfDialogProps = {
  invoiceUrl: string
}

export const PreviewInvoicePdfDialog = ({
  invoiceUrl,
}: PreviewInvoicePdfDialogProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  return (
    <Dialog onOpenChange={setIsPreviewOpen} open={isPreviewOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          <ReceiptText className="size-3" />
          View invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90%] min-w-[75%] flex-1 flex-col">
        <DialogHeader>
          <DialogTitle>Preview PDF</DialogTitle>
        </DialogHeader>

        <iframe
          src={`${invoiceUrl}#toolbar=0`}
          className="h-full w-full rounded-lg border"
          data-testid="pdf-preview-iframe"
        ></iframe>
      </DialogContent>
    </Dialog>
  )
}
