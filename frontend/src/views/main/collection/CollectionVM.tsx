import { useEffect, useState } from 'react'

// TODO
export type Product = {
  id: string
  name: string
  price: number
  image_url: string
}

export const CollectionVM = () => {
  const [products, setProducts] = useState([] as Product[])

  useEffect(() => {
    const p: Product[] = [
      {
        id: '1',
        name: 'product1',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '2',
        name: 'product2',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '3',
        name: 'product3',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '4',
        name: 'product4',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '5',
        name: 'product5',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '6',
        name: 'product6',
        price: 0.0021,
        image_url: 'https://placeimg.com/640/480/animals',
      },
    ]

    setProducts(p)
  }, [])

  return {
    products,
  }
}
