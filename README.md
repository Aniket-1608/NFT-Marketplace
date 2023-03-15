# NFT Marketplace

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
- Install [Moralis]

## Setting Up

#### Local Setup

### 1. Clone/Download the Repository
Clone the project locally:

```
https://github.com/Aniket-1608/NFT-Marketplace.git

```
### 2. Install Dependencies:
```
create a Next.js app, change into the directory and install the dependencies: 

$ npx create-next-app nft-marketplace

$ cd nft-marketplace

$ npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios

Install Tailwind dependencies:

$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest


```
### 3. Boot up local development blockchain
```

$ npx hardhat node

```

### 4. Connect development blockchain accounts to Metamask

- Copy private key of the addresses and import to Metamask
- Connect your metamask to local host network.


### 5. Migrate Smart Contracts
```
In new terminal deploy the smart contract to localhost.

$ npx hardhat run src/backend/scripts/deploy.js --network localhost

Open a browser and go to 'localhost:3000' 

```
### 6. Run Tests
```

$ npx hardhat test
```

### 7. Launch Frontend
```

$ npm run dev
```
#### Deploying to Polygon

1. Add the Mumbai Test Network to your metamask wallet using the folowing configuration and get some test Matic faucet:

    Network Name: Mumbai Testnet

    New RPC URL: https://polygon-mumbai.g.alchemy.com/v2/(API_key)

    Chain ID: 80001

    Currency Symbol: Matic

2. Uncomment the mumbai configuration in hardhat.config.js and ypdate the projectId field with your API key from alchemy.com

3. Deploy to marketplace contract to mumbai network:

    $ npx hardhat run scripts/deploy.js --network mumbai

4. Update the RPC endpoint in the index.js file

    $ const provider = new ethers.providers.JsonRpcProvider("put rpc endpoint of your choice")

5. Launch the frontend

    $ npm run dev






