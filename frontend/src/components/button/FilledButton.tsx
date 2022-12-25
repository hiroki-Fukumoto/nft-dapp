import { Button } from '@material-tailwind/react'
import { size as Size, color as Color } from '@material-tailwind/react/types/components/button'

import { themeSize } from '@/tailwind/theme'

const COLOR = {
  blue: 'blue',
  green: 'green',
  red: 'red',
  yellow: 'amber',
} as const

const SIZE = {
  sm: themeSize.sm,
  md: themeSize.md,
  lg: themeSize.lg,
} as const

export const filledButtonStyle = {
  color: COLOR,
  size: SIZE,
}

interface Props {
  color?: Color
  size?: Size
  label: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const FilledButton = (props: Props) => {
  const { color, size, label, onClick } = props

  return (
    <Button variant="filled" size={size} color={color} onClick={onClick}>
      {label}
    </Button>
  )
}
