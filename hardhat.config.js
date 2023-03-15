require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// const projectId = "API KEY"

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },

    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
    //   accounts: [process.env.PRIVATE_KEY]
    // }

    // Polygon_mainnet: {
    //   url: `https://eth-mainnet.g.alchemy.com/v2/${projectId}`,
    //   accounts: [process.env.PRIVATE_KEY]
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
