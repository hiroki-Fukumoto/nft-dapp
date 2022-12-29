import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductABI } from '@/contracts/product/productABI'
import { CreateProductRequest, ProductResponse } from '@/contracts/product/types'
import { ROUTE } from '@/RouteConfig'
import { RecommendProduct } from '@/views/main/home/components/RecommendCarousel'
// TODO
export type UserRanking = {
  rank: number
  name: string
  avatar_url: string
  floor_price: number
  total_volume: number
}

export const HomeVM = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const productABI = new ProductABI(contractAddress)

  const navigate = useNavigate()

  const [products, setProducts] = useState([] as ProductResponse[])
  const [showCreateProductModal, setShowCreateProductModal] = useState(false)
  const [newProductName, setNewProductName] = useState('')
  const [newProductImageURL, setNewProductImageURL] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState(0)
  const [newProductErrorMessage, setNewProductErrorMessage] = useState('')
  const [errorMessageForAlert, setErrorMessageForAlert] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [recommendProducts, setRecommendProducts] = useState([] as RecommendProduct[])
  const [userRankings, setUserRankings] = useState([] as UserRanking[])

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

  const handleSelectUserRanking = () => {
    navigate(ROUTE.collection)
  }

  // TODO
  const getRecommendProducts = () => {
    const p: RecommendProduct[] = [
      {
        id: '1',
        name: 'product1',
        floor: 0.1,
        image_url: 'https://placeimg.com/640/480/animals/sepia',
      },
      {
        id: '2',
        name: 'product2',
        floor: 0.2,
        image_url: 'https://placeimg.com/640/480/animals',
      },
      {
        id: '3',
        name: 'product3',
        floor: 0.3,
        image_url: 'https://placeimg.com/640/480/arch',
      },
      {
        id: '4',
        name: 'product4',
        floor: 0.4,
        image_url: 'https://placeimg.com/640/480/nature',
      },
      {
        id: '5',
        name: 'product5',
        floor: 0.5,
        image_url: 'https://placeimg.com/640/480/people',
      },
      {
        id: '6',
        name: 'product6',
        floor: 0.6,
        image_url: 'https://placeimg.com/640/480/tech',
      },
      {
        id: '7',
        name: 'product7',
        floor: 0.7,
        image_url: 'https://placeimg.com/640/480/grayscale',
      },
    ]
    setRecommendProducts(p)
  }

  // TODO
  const getUserRankings = () => {
    const users: UserRanking[] = [
      {
        rank: 1,
        name: 'user1',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 2,
        name: 'user2',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 3,
        name: 'user3',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 4,
        name: 'user4',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 5,
        name: 'user5',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 6,
        name: 'user6',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 7,
        name: 'user7',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 8,
        name: 'user8',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 9,
        name: 'user9',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
      {
        rank: 10,
        name: 'user10',
        avatar_url: 'https://placeimg.com/640/480/people',
        floor_price: 0.321,
        total_volume: 100,
      },
    ]

    setUserRankings(users)
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

      // TODO
      getRecommendProducts()
      getUserRankings()
    }
    void init()
  }, [])

  return {
    products,
    showCreateProductModal,
    newProductName,
    newProductImageURL,
    newProductDescription,
    newProductPrice,
    newProductErrorMessage,
    errorMessageForAlert,
    recommendProducts,
    showErrorAlert,
    userRankings,
    handleCreateProduct,
    handleCloseProductCreateModal,
    handleChangeNewProductName,
    handleChangeNewProductImageURL,
    handleChangeNewProductDescription,
    handleChangeNewProductPrice,
    handleCreateNewProduct,
    handleCloseErrorAlert,
    handleSelectUserRanking,
  }
}
