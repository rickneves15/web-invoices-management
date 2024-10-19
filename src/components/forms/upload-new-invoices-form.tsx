'use client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  type UploadNewInvoicesForm,
  uploadNewInvoicesFormSchema,
} from '~/schemas/upload-new-invoices-form'
import { uploadInvoices } from '~/services/invoices'

export function UploadNewInvoicesForm() {
  const form = useForm<z.infer<typeof uploadNewInvoicesFormSchema>>({
    resolver: zodResolver(uploadNewInvoicesFormSchema),
  })

  const fileRef = form.register('invoicesFiles')

  const onSubmit = async ({ invoicesFiles }: UploadNewInvoicesForm) => {
    try {
      await uploadInvoices(invoicesFiles)

      form.reset()
      toast.success('Invoices uploaded successfully')
    } catch (error) {
      console.error('Error uploading invoices:', error)

      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast.error('Error uploading invoices', {
            description:
              'The invoices you are trying to upload already exist in our database.',
          })
        }
      }

      toast.error('Error uploading invoices')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="invoicesFiles"
          render={() => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...fileRef}
                    type="file"
                    className="cursor-pointer"
                    accept=".pdf"
                    multiple
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )
          }}
        />
        <Button className="mt-4 w-full" disabled={form.formState.isSubmitting}>
          Sent invoices
        </Button>
      </form>
    </Form>
  )
}
