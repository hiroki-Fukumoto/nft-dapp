import productContract from 'solidity/artifacts/contracts/Product.sol/Product.json'
import { Product as TProduct } from 'solidity/types/web3-v1-contracts/Product'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { CreateProductRequest, ProductResponse } from '@/contracts/product/types'
import { Web3Factory } from '@/web3/index'

export class ProductABI {
  web3Factory: Web3Factory
  contractAddress: string
  web3: Web3
  account: string
  contract: () => TProduct

  constructor(address: string) {
    this.web3Factory = new Web3Factory()
    this.contractAddress = address
    this.web3 = this.web3Factory.getWeb3()
    this.account = this.web3.eth.defaultAccount as string
    this.contract = () => {
      return new this.web3.eth.Contract(productContract.abi as AbiItem[], this.contractAddress) as unknown as TProduct
    }
  }

  async getProducts(): Promise<ProductResponse[]> {
    return await this.contract()
      .methods.getProductIDs()
      .call({ from: this.account })
      .then((ids) => {
        const res: ProductResponse[] = []
        return Promise.all(
          ids.map(async (id) => {
            const p = await this.getProduct(id)
            res.push(p)
          })
        ).then(() => {
          return res
        })
      })
      .catch((e: Error) => {
        throw e
      })
  }

  getProduct(id: string): Promise<ProductResponse> {
    return this.contract()
      .methods.getProduct(id)
      .call({ from: this.account })
      .then((p) => {
        const product: ProductResponse = {
          id: p[0],
          name: p[1],
          image_url: p[2],
          description: p[3],
          price: Number(p[4]),
          timestamp: p[5],
        }
        return product
      })
      .catch((e: Error) => {
        throw e
      })
  }

  createProduct(request: CreateProductRequest) {
    return this.contract()
      .methods.createProduct([request.name, request.image_url, request.description, request.price])
      .send({ from: this.account })
      .catch((e: Error) => {
        throw e
      })
  }
}
