import { Home, ReceiptText } from 'lucide-react'

import { UploadNewInvoicesDialog } from './modals/upload-new-invoices-dialog'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/">
            <Home className="size-4" />
            Home
          </NavLink>
          <NavLink href="/invoices">
            <ReceiptText className="" />
            Invoices
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <UploadNewInvoicesDialog />
        </div>
      </div>
    </header>
  )
}
