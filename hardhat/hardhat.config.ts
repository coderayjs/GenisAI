import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import { vars } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: "0.8.27",
    networks: {
        'monad-devnet': {
            url: vars.get("MONAD_RPC_URL"),
            accounts: [vars.get("PRIVATE_KEY")],
            chainId: 41454,
        },
    },
};

export default config;