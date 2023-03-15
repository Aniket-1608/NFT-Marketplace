require("@nomicfoundation/hardhat-toolbox");

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
    // Goerli: {
    //   url: `https://goerli.infura.io/v3/${projectId}`,
    //   accounts: [privateKey]
    // },
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
