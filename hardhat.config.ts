require('dotenv').config()

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-contract-sizer'

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.23',
        settings: {
            evmVersion: 'paris',
            viaIR: false,
            optimizer: {
                enabled: true,
                runs: 100,
            },
        },
    },
    networks: {
        hardhat: {
        },
        sepolia: {
            chainId: 11155111,
            url: process.env.SEPOLIA_URL as string,
            accounts: [process.env.MAINNET_PK as string],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY as string,
        },
    },
}

export default config
