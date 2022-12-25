import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect, use } from 'chai'
import { ethers } from 'hardhat'

describe('Product', () => {
  async function deployProductFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const Product = await ethers.getContractFactory('Product')
    const contract = await Product.deploy()

    return { contract, owner, otherAccount }
  }

  const dummyData = {
    name: 'product1',
    description: 'description',
    imageURL: 'http://test.png',
    price: 10,
    stock: 20,
  }

  describe('Get product', () => {
    describe('List', () => {
      it('Success', async () => {
        const { contract } = await loadFixture(deployProductFixture)
        await contract.createProduct(dummyData)
        const dummyData2 = dummyData
        dummyData2.name = 'product2'
        await contract.createProduct(dummyData)
        const products = await contract.getProductIDs()

        expect(products.length).to.equal(2)
      })
    })

    describe('Find', () => {
      it('Success', async () => {
        const { contract } = await loadFixture(deployProductFixture)
        await contract.createProduct(dummyData)
        const product = await contract.getProduct(0)
        expect(product.name).to.equal(dummyData.name)
      })
      it('Faild', async () => {
        const { contract } = await loadFixture(deployProductFixture)
        await expect(contract.getProduct(1)).to.revertedWith('Product not found')
      })
    })
  })

  describe('Create product', () => {
    it('Success', async () => {
      const { contract } = await loadFixture(deployProductFixture)
      await contract.createProduct(dummyData)
      const products = await contract.getProductIDs()
      expect(products.length).to.equal(1)
    })

    it('Failed', async () => {
      const { contract } = await loadFixture(deployProductFixture)
      const ps = [
        {
          name: '',
          description: 'description',
          imageURL: 'http://test.png',
          price: 10,
          stock: 20,
          expected: 'name cannot be empty',
        },
        {
          name: 'name',
          description: '',
          imageURL: 'http://test.png',
          price: 10,
          stock: 20,
          expected: 'description cannot be empty',
        },
        {
          name: 'name',
          description: 'description',
          imageURL: '',
          price: 10,
          stock: 20,
          expected: 'image URL cannot be empty',
        },
        {
          name: 'name',
          description: 'description',
          imageURL: 'http://test.png',
          price: 0,
          stock: 20,
          expected: 'price cannot be zero',
        },
        {
          name: 'name',
          description: 'description',
          imageURL: 'http://test.png',
          price: 10,
          stock: 0,
          expected: 'stock cannot be zero',
        },
      ]

      ps.forEach(async (p) => {
        await expect(contract.createProduct(p)).to.be.revertedWith(p.expected)
      })
    })
  })
})
