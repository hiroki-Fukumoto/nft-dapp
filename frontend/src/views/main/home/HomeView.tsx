import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { ProductCreateModal } from '@/views/main/home/components/ProductCreateModal'
import { RecommendCarousel } from '@/views/main/home/components/RecommendCarousel'
import { UserRanking } from '@/views/main/home/components/UserRanking'
import { HomeVM } from '@/views/main/home/HomeVM'
import { MainView } from '@/views/main/MainView'

export const HomeView = () => {
  const VM = HomeVM()

  return (
    <>
      <MainView>
        <ErrorMessageAlert
          show={VM.showErrorAlert}
          message={VM.errorMessageForAlert}
          onClose={VM.handleCloseErrorAlert}
        />

        <div className="mb-16">
          <RecommendCarousel products={VM.recommendProducts} />
        </div>

        <div>
          <p className="text-xl mb-3">Rankings</p>
          <UserRanking rankings={VM.userRankings} onClick={VM.handleSelectUserRanking} />
        </div>

        {/* <div className="mb-3">
          <FilledButton color={buttonStyle.color.green} label="Create" onClick={VM.handleCreateProduct} />
        </div> */}

        {/* <div className="grid grid-cols-4 gap-4">
          {VM.products.map((p: ProductResponse, i) => (
            <ProductCard key={`product-${i}`} product={p} />
          ))}
        </div> */}
      </MainView>

      <ProductCreateModal
        show={VM.showCreateProductModal}
        name={VM.newProductName}
        imageURL={VM.newProductImageURL}
        description={VM.newProductDescription}
        price={VM.newProductPrice}
        errorMessage={VM.newProductErrorMessage}
        handleChangeName={VM.handleChangeNewProductName}
        handleChangeImageURL={VM.handleChangeNewProductImageURL}
        handleChangeDescription={VM.handleChangeNewProductDescription}
        handleChangePrice={VM.handleChangeNewProductPrice}
        onClose={VM.handleCloseProductCreateModal}
        onCreate={VM.handleCreateNewProduct}
      />
    </>
  )
}
