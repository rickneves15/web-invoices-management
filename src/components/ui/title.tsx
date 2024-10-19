import { ComponentPropsWithoutRef } from 'react'

type TitleProps = ComponentPropsWithoutRef<'h1'>

export function Title({ ...props }: TitleProps) {
  return <h1 className="text-3xl font-bold tracking-tight" {...props} />
}
