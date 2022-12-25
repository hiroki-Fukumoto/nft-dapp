import { Props } from '@components/button/index'
import { Button } from '@material-tailwind/react'

export const OutlinedButton = (props: Props) => {
  const { color, size, label, onClick } = props

  return (
    <Button variant="outlined" size={size} color={color} onClick={onClick}>
      {label}
    </Button>
  )
}
