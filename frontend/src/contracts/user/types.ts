export type AccountResponse = {
  id: string
  name: string
  bio: string
  header_image_url: string
  avatar_image_url: string
  floor_price: number
  total_volume: number
  timestamp: string
}

export type MeResponse = AccountResponse & {
  email: string
}

export type CreateAccountRequest = {
  name: string
  bio: string
  email: string
  header_image_url: string
  avatar_image_url: string
}

export type UpdateAccountRequest = CreateAccountRequest & {
  id: string
}
