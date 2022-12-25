export type ProductResponse = {
  id: string
  name: string
  image_url: string
  description: string
  price: number
  stock: number
  timestamp: string
}

export type CreateProductRequest = {
  name: string
  image_url: string
  description: string
  price: number
  stock: number
}
