// SEE: https://fontawesome.com/icons

import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faUser, faWallet, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { themeSize } from '@/tailwind/theme'

const ICON_TYPE = {
  user: faUser,
  wallet: faWallet,
  cart: faCartShopping,
} as const
type IconType = typeof ICON_TYPE[keyof typeof ICON_TYPE]

const SIZE = {
  sm: themeSize.sm as SizeProp,
  md: themeSize.md as SizeProp,
  lg: themeSize.lg as SizeProp,
} as const

export const iconStyle = {
  type: ICON_TYPE,
  size: SIZE,
}

interface Props {
  type: IconType
  size?: SizeProp
}

export const Icon = (props: Props) => {
  const { type, size } = props

  return <FontAwesomeIcon icon={type} size={size} />
}
