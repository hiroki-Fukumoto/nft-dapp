import { FilledButton, filledButtonStyle } from '@components/button/FilledButton'
import { ProductResponse } from '@contracts/product/types'
import { ProductCard } from '@mainViews/home/components/ProductCard'
import { ProductCreateModal } from '@mainViews/home/components/ProductCreateModal'
import { HomeVM } from '@mainViews/home/HomeVM'
import { MainView } from '@mainViews/MainView'

import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'

export const HomeView = () => {
  const VM = HomeVM()

  return (
    <>
      <MainView>
        <ErrorMessageAlert
          show={VM.getShowErrorAlert()}
          message={VM.getErrorMessageForAlert()}
          onClose={VM.handleCloseErrorAlert}
        />

        <div className="mb-3">
          <FilledButton color={filledButtonStyle.color.green} label="Create" onClick={VM.handleCreateProduct} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {VM.getProducts().map((p: ProductResponse, i) => (
            <ProductCard key={`product-${i}`} product={p} />
          ))}
        </div>
      </MainView>

      <ProductCreateModal
        show={VM.getShowCreateProductModal()}
        name={VM.getNewProductName()}
        imageURL={VM.getNewProductImageURL()}
        description={VM.getNewProductDescription()}
        price={VM.getNewProductPrice()}
        stock={VM.getNewProductStock()}
        errorMessage={VM.getNewProductErrorMessage()}
        handleChangeName={VM.handleChangeNewProductName}
        handleChangeImageURL={VM.handleChangeNewProductImageURL}
        handleChangeDescription={VM.handleChangeNewProductDescription}
        handleChangePrice={VM.handleChangeNewProductPrice}
        handleChangeStock={VM.handleChangeNewProductStock}
        onClose={VM.handleCloseProductCreateModal}
        onCreate={VM.handleCreateNewProduct}
      />
    </>
  )
}
