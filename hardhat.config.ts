import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/testTransientStorage";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      // optimizer: {
      //   enabled: true,
      //   runs: 200,
      // },
      evmVersion: "cancun"
    },
  },
  networks: {
    nexera: {
      chainId: 32382,
      url: `http://localhost:8545`,
      accounts: [vars.get("PRIVATE_KEY")],
    },
  },
};

export default config;
