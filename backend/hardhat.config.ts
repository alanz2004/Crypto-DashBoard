import "@nomicfoundation/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    inprocess: {
      type: "edr-simulated", // ✅ this replaces "hardhat"
      chainId: 31337,
    },
    localhost: {
      type: "http", // ✅ standard HTTP connection
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;
