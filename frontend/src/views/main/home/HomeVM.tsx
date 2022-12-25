import { ProductABI } from '@contracts/product/productABI'
import { CreateProductRequest, ProductResponse } from '@contracts/product/types'
import { useEffect, useState } from 'react'

export const HomeVM = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const productABI = new ProductABI(contractAddress)

  const [products, setProducts] = useState([] as ProductResponse[])
  const [showCreateProductModal, setShowCreateProductModal] = useState(false)
  const [newProductName, setNewProductName] = useState('')
  const [newProductImageURL, setNewProductImageURL] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState(0)
  const [newProductStock, setNewProductStock] = useState(0)
  const [newProductErrorMessage, setNewProductErrorMessage] = useState('')
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  // == state ==
  const getProducts = () => products
  const getShowCreateProductModal = () => showCreateProductModal
  const getNewProductName = () => newProductName
  const getNewProductImageURL = () => newProductImageURL
  const getNewProductDescription = () => newProductDescription
  const getNewProductPrice = () => newProductPrice
  const getNewProductStock = () => newProductStock
  const getNewProductErrorMessage = () => newProductErrorMessage
  const getErrorMessageForAlert = () => errorMessageForAlert
  const getShowErrorAlert = () => showErrorAlert

  // == ABI ==
  const getProductsABI = () => {
    return productABI
      .getProducts()
      .then((res) => {
        return res
      })
      .catch((e: Error) => {
        throw e
      })
  }

  const createProductABI = () => {
    const req: CreateProductRequest = {
      name: newProductName,
      image_url: newProductImageURL,
      description: newProductDescription,
      price: newProductPrice,
      stock: newProductStock,
    }
    return productABI.createProduct(req)
  }

  // == methods ==
  const handleCreateProduct = () => {
    setShowCreateProductModal(true)
  }

  const handleCloseProductCreateModal = () => {
    setShowCreateProductModal(false)
    setNewProductName('')
    setNewProductImageURL('')
    setNewProductDescription('')
    setNewProductPrice(0)
    setNewProductStock(0)
  }

  const handleChangeNewProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductName(event.target.value)
  }

  const handleChangeNewProductImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductImageURL(event.target.value)
  }

  const handleChangeNewProductDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProductDescription(event.target.value)
  }

  const handleChangeNewProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductPrice(Number(event.target.value))
  }

  const handleChangeNewProductStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductStock(Number(event.target.value))
  }

  const handleCreateNewProduct = () => {
    setNewProductErrorMessage('')
    void createProductABI()
      .then(async () => {
        await getProductsABI()
          .then((p) => {
            setProducts(p)
            setShowCreateProductModal(false)
          })
          .catch((e: Error) => {
            setErrorMessageForAlert(e.message)
            setShowErrorAlert(true)
          })
      })
      .catch((e: Error) => {
        setNewProductErrorMessage(e.message)
      })
  }

  const handleCloseErrorAlert = () => {
    setErrorMessageForAlert('')
    setShowErrorAlert(false)
  }

  // == init ==
  useEffect(() => {
    async function init() {
      await getProductsABI()
        .then((p) => {
          setProducts(p)
        })
        .catch((e: Error) => {
          setErrorMessageForAlert(e.message)
          setShowErrorAlert(true)
        })
    }
    void init()
  }, [])

  return {
    getProducts,
    getShowCreateProductModal,
    getNewProductName,
    getNewProductImageURL,
    getNewProductDescription,
    getNewProductPrice,
    getNewProductStock,
    getNewProductErrorMessage,
    getErrorMessageForAlert,
    getShowErrorAlert,
    handleCreateProduct,
    handleCloseProductCreateModal,
    handleChangeNewProductName,
    handleChangeNewProductImageURL,
    handleChangeNewProductDescription,
    handleChangeNewProductPrice,
    handleChangeNewProductStock,
    handleCreateNewProduct,
    handleCloseErrorAlert,
  }
}
