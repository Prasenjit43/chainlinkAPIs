# Chainlink API

Chainlink's API allows smart contracts to seamlessly access external data sources through a decentralized oracle network. This network enables the secure interaction between on-chain and off-chain applications by providing the ability to push and pull data.

One of the functionalities provided is the HTTP GET Single Word Response, which involves making an HTTP GET request and parsing the JSON response to extract the value of a single attribute.

Additionally, there is the HTTP GET Multi-Variable Responses, which also makes an HTTP GET request but parses the JSON response to retrieve multiple attribute values.

Moreover, there is the HTTP GET Element in Array Response, where an HTTP GET request returns a JSON array that can be parsed to extract the value of the desired target element.

With these features, Chainlink empowers smart contracts with the flexibility to access diverse data sources and interact efficiently with external systems in a secure and trustless manner.

## Prerequisites

Before running this project, make sure you have the following prerequisites installed:

1. Metamask
2. VS code
3. Node.js

## Overview of project files

This repository contains the following smart contract files:

1. `SingleResponse.sol`: Makes an HTTP GET request and parses the JSON response to retrieve the value of one single attribute.
2. `MultiResponse.sol`: Makes an HTTP GET request and parses the JSON response to retrieve the values of multiple attributes.
3. `FetchFromArray.sol`: Makes an HTTP GET request that returns a JSON array and parses it to retrieve the target element's value.

## Deployment Scripts

The repository includes deployment scripts to deploy the smart contracts:

1. `1_deploy.js`: Deploys `SingleResponse.sol`.
2. `2_deploy.js`: Deploys `MultiResponse.sol`.
3. `3_deploy.js`: Deploys `FetchFromArray.sol`.

## Executing Scripts

The following scripts execute the smart contracts and interact with Chainlink:

1. `singleResponse.js`: Executes `SingleResponse.sol` contract to pull the traded volume of ETH/USD in the last 24 hours.
2. `multiResponse.js`: Executes `MultiResponse.sol` and pulls corresponding values of BTC, USD, and EUR for 1 ether.
3. `fetchFromArray.js`: Executes `FetchFromArray.sol` which pulls the 0th ID from the array response.

Note: All the contracts are using Operator Contracts and Job IDs. You can read more about this in the Chainlink documentation: [Chainlink Testnet Oracles - Examples](https://docs.chain.link/any-api/testnet-oracles#examples).

## Installation

To get started with the project, follow these steps:

1. Clone the repository using the following command:
   ```
   git clone https://github.com/Prasenjit43/chainlinkAPIs.git
   ```
2. Navigate to the project directory:
   ```
   cd chainlinkAPIs/
   ```
3. Install the required npm packages:
   ```
   npm install
   ```

## Running the Project

To run the project and execute the scripts, follow these steps:

1. Execute `singleResponse.js` using the Goerli network:
   ```
   npx hardhat run scripts/singleResponse.js --network goerli
   ```

2. Execute `multiResponse.js` using the Goerli network:
   ```
   npx hardhat run scripts/multiResponse.js --network goerli
   ```

3. Execute `fetchFromArray.js` using the Goerli network:
   ```
   npx hardhat run scripts/fetchFromArray.js --network goerli
   ```

Make sure you have configured your Metamask and other network settings properly before running these scripts.

Feel free to explore and extend the functionalities of the smart contracts and scripts to suit your requirements. Happy coding!
