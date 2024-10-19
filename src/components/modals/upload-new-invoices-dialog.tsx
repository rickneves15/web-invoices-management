'use client'
import { useState } from 'react'

import { Upload } from 'lucide-react'

import { UploadNewInvoicesForm } from '~/components/forms/upload-new-invoices-form'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

export function UploadNewInvoicesDialog() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  return (
    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-2" variant="outline" size="default">
          <Upload className="size-3" />
          <span>Sent new invoice</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Sent Invoice
          </DialogTitle>

          <UploadNewInvoicesForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
