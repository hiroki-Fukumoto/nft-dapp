import { Card } from 'flowbite-react'

interface Props {
  children: JSX.Element | JSX.Element[]
  color?: string
}

export const SimpleCard = (props: Props) => {
  const { children, color } = props

  return <Card className={color}>{children}</Card>
}
