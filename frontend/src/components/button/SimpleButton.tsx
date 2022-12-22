import { Button } from 'flowbite-react'

import { themeSize } from '@/tailwind/theme'

const COLOR = {
  blue: 'blue',
  green: 'success',
  red: 'failure',
  yellow: 'warning'
} as const
type Color = typeof COLOR[keyof typeof COLOR]

const SIZE = {
  xs: themeSize.xs,
  sm: themeSize.sm,
  base: themeSize.base,
  lg: themeSize.lg,
  xl: themeSize.xl
} as const
type Size = typeof SIZE[keyof typeof SIZE]

export const simpleButtonStyle = {
  color: COLOR,
  size: SIZE
}

interface Props {
  color?: Color
  size?: Size
  label: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const SimpleButton = (props: Props) => {
  const { color, size, label, onClick } = props

  return (
    <Button color={color} size={size} onClick={onClick}>
      {label}
    </Button>
  )
}
