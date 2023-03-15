require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

// const fs = require("fs")
// const privateKey = fs.readFileSync(".secret").toString()
// const projectId = "8fdeb94e26ae4282aeb1181b0666c344"

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    // defaultNetwork: "matic",
    // networks: {
    //   hardhat: {
    //   },
    //   polygon_mumbai: {
    //     url: "https://rpc-mumbai.maticvigil.com",
    //     accounts: [process.env.PRIVATE_KEY]
    //   }
    // Ethereum_mainnet: {
    //   url: `https://mainnet.infura.io/v3/${projectId}`,
    //   accounts: [privateKey]
    // }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
