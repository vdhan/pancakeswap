require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      },

      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      },

      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },

  networks: {
    localhost: {allowUnlimitedContractSize: true},

    testnet: {
      url: 'https://data-seed-prebsc-1-s3.binance.org:8545',
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true
    }
  },

  etherscan: {apiKey: process.env.SCAN_TOKEN}
};
