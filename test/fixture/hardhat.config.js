require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  typechain: {
    outDir: require("path").join(__dirname, "typechain"),
  },
};
