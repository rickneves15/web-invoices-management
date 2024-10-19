import { ComponentPropsWithoutRef } from 'react'

type TitleProps = ComponentPropsWithoutRef<'h1'>

const Title = ({ ...props }: TitleProps) => {
  return <h1 className="text-3xl font-bold tracking-tight" {...props} />
}

export default Title
