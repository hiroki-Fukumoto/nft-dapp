import { ProductResponse } from '@contracts/product/types'
import { CardBody, Typography } from '@material-tailwind/react'

import { BaseCard } from '@/components/card/BaseCard'

interface Props {
  product: ProductResponse
}

export const ProductCard = (props: Props) => {
  const { product } = props

  return (
    <BaseCard>
      <div className="flex justify-center items-center">
        <img src="https://placehold.jp/150x150.png" />
      </div>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {product.name}
        </Typography>
        <p>{product.description}</p>
        <p>Price: {product.price} ETH</p>
        <p>Stock: {product.stock}</p>
      </CardBody>
    </BaseCard>
  )
}
