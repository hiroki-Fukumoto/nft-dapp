import { ethers } from 'hardhat'

async function main() {
  const fee = ethers.utils.parseEther('0.002')

  const Product = await ethers.getContractFactory('Product')
  const product = await Product.deploy(fee)
  await product.deployed()

  const User = await ethers.getContractFactory('User')
  const user = await User.deploy(fee)
  await user.deployed()

  const ProductStats = await ethers.getContractFactory('ProductStats')
  const productStats = await ProductStats.deploy()
  await productStats.deployed()

  console.log('Product deployed to:', product.address)
  console.log('User deployed to:', user.address)
  console.log('ProductStats deployed to:', productStats.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
