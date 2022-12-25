import { Card } from '@material-tailwind/react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const BaseCard = (props: Props) => {
  const { children } = props
  return <Card>{children}</Card>
}
