import { CardBody, CardHeader } from '@material-tailwind/react'

import { BaseCard } from '@/components/card/BaseCard'
import { Product } from '@/views/main/collection/CollectionVM'

interface Props {
  product: Product
}

export const ProductCard = (props: Props) => {
  const { product } = props

  return (
    <BaseCard>
      <div className="cursor-pointer relative group">
        <CardHeader floated={false} className="h-30">
          <img src={product.image_url} />
        </CardHeader>
        <CardBody>
          <div className="font-bold">{product.name}</div>
          <div className="font-bold">{product.price} ETH</div>
        </CardBody>
        <div className="w-full bg-blue-500 hidden rounded-b-xl text-white text-center py-2 absolute bottom-0 group-hover:block">
          Add to Cart
        </div>
      </div>
    </BaseCard>
  )
}
