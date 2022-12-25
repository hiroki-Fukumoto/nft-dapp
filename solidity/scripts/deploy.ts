import { ethers } from 'hardhat'

async function main() {
  const Product = await ethers.getContractFactory('Product')
  const product = await Product.deploy()
  await product.deployed()

  console.log('Product deployed to:', product.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
