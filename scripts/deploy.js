const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  // const nftMarketplace = await NFTMarketplace.deploy();
  // console.log("Deploying NFT Marketplace Contract...");

  // await nftMarketplace.waitForDeployment();

  //to deploy an upgradable proxy contract.
  // const deployProxyMarketplace = await hre.ethers.getContractFactory("NFTMarketplaceUpgradeable");
  // const nftMarketplaceProxy = await hre.upgrades.deployProxy(deployProxyMarketplace);
  // console.log("Deploying nftMarketplace proxy... ");

  // await nftMarketplaceProxy.waitForDeployment();
  // console.log(`nftMarketplace proxy deployed to: ${nftMarketplaceProxy.target}`);

  //to upgrade an deployed contract
  const upgradeProxyMarketplace = await hre.ethers.getContractFactory("NFTMarketplaceUpgradeableV2");
  const nftMarketplaceProxyv2 = await hre.upgrades.deployProxy(upgradeProxyMarketplace);
  console.log("Deploying nftMarketplace proxy... ");

  await nftMarketplaceProxyv2.waitForDeployment();
  console.log(`nftMarketplace proxy deployed to: ${nftMarketplaceProxyv2.target}`);

  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${nftMarketplaceProxyv2.target}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });