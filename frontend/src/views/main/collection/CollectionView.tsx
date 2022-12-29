import { CollectionVM, Product } from '@/views/main/collection/CollectionVM'
import { ProductCard } from '@/views/main/collection/components/ProductCard'
import { MainView } from '@/views/main/MainView'

export const CollectionView = () => {
  const VM = CollectionVM()

  return (
    <MainView>
      <div className="relative mb-16">
        <img src="https://placeimg.com/640/480/nature" className="h-64 w-full object-cover rounded-xl" />

        <img
          src="https://placeimg.com/640/480/animals"
          className="h-40 w-40 absolute top-1/2 left-10 rounded-xl border-4 border-white shadow"
        />
      </div>

      <div className="mb-8">
        <p className="font-bold text-2xl">User name</p>
        <p>hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge</p>
      </div>

      <div className="mb-8">
        <div className="flex">
          <div className="mr-4">
            <p className="font-bold text-xl">100 ETH</p>
            <p className="text-gray-500">total volume</p>
          </div>
          <div>
            <p className="font-bold text-xl">0.0020 ETH</p>
            <p className="text-gray-500">floor price</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">sort menu</div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-4">
            {VM.products.map((p: Product, i) => (
              <ProductCard key={`product-${i}`} product={p} />
            ))}
          </div>
        </div>
      </div>
    </MainView>
  )
}
