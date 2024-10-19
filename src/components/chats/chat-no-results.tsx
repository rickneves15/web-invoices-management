import { ComponentPropsWithRef } from 'react'

import { Button } from '~/components/ui/button'

interface NoResultProps extends ComponentPropsWithRef<'button'> {
  text: string
}

export function NoResult({ text, ...props }: NoResultProps) {
  return (
    <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
      <span className="text-muted-foreground text-sm">{text}</span>
      <Button
        variant="link"
        size="default"
        className="text-emerald-500 dark:text-emerald-400"
        {...props}
      >
        Reload
      </Button>
    </div>
  )
}

export default NoResult
