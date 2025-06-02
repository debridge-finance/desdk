import '@nomicfoundation/hardhat-toolbox';
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig, task } from "hardhat/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    bnb: {
      url: "https://bsc-dataseed.binance.org",
    },
  },
  typechain: {
    outDir: "./src/evm/typechain",
  },
};
export default config;
