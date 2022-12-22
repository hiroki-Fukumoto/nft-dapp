import { ethers } from "hardhat";

async function main() {
  const Todo = await ethers.getContractFactory("todo");
  const todo = await Todo.deploy();

  await todo.deployed();

  console.log("Todo deployed to:", todo.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
