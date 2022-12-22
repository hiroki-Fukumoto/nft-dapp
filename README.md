# NFT DApp Sample Project

This is a NFT sample project using Hardhat and React.

# Requirement

- (React 18)[https://en.reactjs.org/]
- (Typescript)[https://www.typescriptlang.org/docs/]
- (Solidity)[https://solidity-jp.readthedocs.io/ja/latest/]
- (Hardhat)[https://hardhat.org/]
- (Metamask)[https://metamask.io/]
- (web3.js)[https://web3js.readthedocs.io/en/v1.8.1/]
- (flowbite-react)[https://flowbite-react.com/]
- (tailwind css)[https://v1.tailwindcss.com/docs/installation]

# Set up

```bash
$ npm i
$ cd ./solidity
$ npm link
$ cd ./frontend
$ npm link solidity
```

You must run `npm link solidity` every time you run `npm i`.
Normally, it would be preferable to separate the frontend project and the solidity project,
but we chose to do this because we prioritize development efficiency.

# Usage

Please run each on a different terminal.

1. Start Hardhat.

```bash
$ cd ./solidity
$ make launch
```

Use the private key displayed at this time to set up your Metamask.
For more information about Metamask, please click [here](https://metamask.io/) and set it up.
Your Metamask account is your wallet address.

2. Deploy

```bash
$ cd ./solidity
$ make deploy
```

The address displayed at this time is the contract address.

3. Start the frontend project.

```bash
$ cd ./frontend
$ npm start
```

go to http://localhost:3000

4. When you edit Solidity files, you need to generate a type.

```bash
$ cd ./solidity
$ make typechain c={contract name}

ex)
make typechain c=todo
```
