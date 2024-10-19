'use client'
import { PropsWithChildren } from 'react'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '~/lib/utils'

type NavLinkProps = LinkProps & PropsWithChildren

export function NavLink({ children, href, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isCurrent = href === pathname

  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'text-muted-foreground flex items-center gap-1.5 bg-background text-sm font-medium transition-colors hover:text-foreground',
        {
          'text-foreground': isCurrent,
        },
      )}
    >
      {children}
    </Link>
  )
}
