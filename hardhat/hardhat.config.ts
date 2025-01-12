import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.27",
    networks: {
        'monad-devnet': {
            url: process.env.MONAD_RPC_URL,
            accounts: [process.env.PRIVATE_KEY!],
            chainId: 20143,
            httpHeaders: {
                "Authorization": "Basic " + Buffer.from(`${process.env.username}:${process.env.password}`).toString("base64")
            }
        },
    },
};

export default config;