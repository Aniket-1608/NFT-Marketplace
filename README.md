# Upgradable NFT Marketplace

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers] (Blockchain Interaction)
- [Hardhat] (Development Framework)
- [Ipfs] (Metadata storage)
- [React-routers] (Navigational components)

## Requirements For Initial Setup

- Install [NodeJS]
- Install [Hardhat]
- Install [Thirdweb]

## Setting Up

#### Local Setup

### 1. Clone/Download the Repository

Clone the project locally:

```
https://github.com/Aniket-1608/NFT-Marketplace.git

```

### 2. Install Dependencies:

```
Change into the directory and install the dependencies:

$ cd nft-marketplace

$ npm install


```

### 3. Boot up local development blockchain

```
$ npx hardhat node

```

### 4. Deploy Smart Contracts

```
In new terminal deploy the smart contract to localhost.

$ npm run deploy

```

### 5. Run Tests

```
$ npx hardhat test
```

### 6. Launch Frontend

```
$ npm run dev
```

#### Deploying to Sepolia

1. Add your Infura API key, Etherscan API key and Wallet private key to the hardhat.config file

   Network Name: Sepolia Testnet

   New RPC URL: https://sepolia.infura.io/v3/${INFURA_API_KEY}

2. Deploy the marketplace contract to Sepolia network:

```
    $ npx hardhat run scripts/deploy.js --network sepolia
```

3. Verify the deployed marketplace contract to Sepolia network using the etherscan api key:

```
    $ npx hardhat verify --network sepolia "DEPLOYED_CONTRACT_ADDRESS"
```

4. Launch the frontend

```
    $ npm run dev
```
